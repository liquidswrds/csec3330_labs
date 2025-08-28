import { useState, useCallback } from 'react';
import { LabState, SystemConnection, ConnectionValidation, SystemNode, LabProgress } from '../types';
import { factorySystems, correctConnections } from '../data/factoryData';

export function useInterconnectionLabState() {
  const [labState, setLabState] = useState<LabState>({
    systems: factorySystems,
    connections: [],
    selectedSystem: null,
    selectedConnection: null,
    hoveredSystem: null,
    showDataflows: false,
    showThreats: false,
    isConnecting: false,
    connectionStart: null,
    progress: {
      currentSection: 'overview',
      completedSections: [],
      correctConnections: 0,
      totalConnections: correctConnections.length,
      assessmentScore: 0,
      timeSpent: 0,
      hintsUsed: 0,
      physicalConnectionsScore: 0,
      networkConnectionsScore: 0,
      logicalConnectionsScore: 0,
      wirelessConnectionsScore: 0,
      dataFlowScore: 0
    },
    tutorialMode: false,
    currentTutorialStep: 0,
    validationResults: new Map()
  });

  // System selection handlers
  const handleSystemClick = useCallback((system: SystemNode) => {
    setLabState(prev => ({
      ...prev,
      selectedSystem: prev.selectedSystem?.id === system.id ? null : system,
      selectedConnection: null
    }));
  }, []);

  const handleSystemHover = useCallback((system: SystemNode | null) => {
    setLabState(prev => ({
      ...prev,
      hoveredSystem: system
    }));
  }, []);

  // Connection management
  const handleStartConnection = useCallback((system: SystemNode) => {
    setLabState(prev => ({
      ...prev,
      isConnecting: true,
      connectionStart: system,
      selectedSystem: system
    }));
  }, []);

  const handleCompleteConnection = useCallback((targetSystem: SystemNode) => {
    if (!labState.connectionStart) return;
    
    // Check if connection already exists
    const existingConnection = labState.connections.find(conn =>
      (conn.sourceId === labState.connectionStart!.id && conn.targetId === targetSystem.id) ||
      (conn.sourceId === targetSystem.id && conn.targetId === labState.connectionStart!.id)
    );

    if (existingConnection) {
      // Connection already exists, just select it
      setLabState(prev => ({
        ...prev,
        selectedConnection: existingConnection,
        isConnecting: false,
        connectionStart: null
      }));
      return;
    }

    // Start the connection creation process - the actual connection will be created
    // when the user fills out the form in ConnectionMapper
    setLabState(prev => ({
      ...prev,
      selectedConnection: null
    }));
  }, [labState.connectionStart, labState.connections]);

  const handleCancelConnection = useCallback(() => {
    setLabState(prev => ({
      ...prev,
      isConnecting: false,
      connectionStart: null
    }));
  }, []);

  const handleCreateConnection = useCallback((connectionData: Omit<SystemConnection, 'id'>) => {
    const newConnection: SystemConnection = {
      ...connectionData,
      id: `user-conn-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };

    setLabState(prev => ({
      ...prev,
      connections: [...prev.connections, newConnection],
      isConnecting: false,
      connectionStart: null,
      selectedConnection: newConnection
    }));
  }, []);

  const handleUpdateConnection = useCallback((connectionId: string, updates: Partial<SystemConnection>) => {
    setLabState(prev => ({
      ...prev,
      connections: prev.connections.map(conn =>
        conn.id === connectionId ? { ...conn, ...updates } : conn
      )
    }));
  }, []);

  const handleDeleteConnection = useCallback((connectionId: string) => {
    setLabState(prev => ({
      ...prev,
      connections: prev.connections.filter(conn => conn.id !== connectionId),
      selectedConnection: prev.selectedConnection?.id === connectionId ? null : prev.selectedConnection
    }));
  }, []);

  const handleConnectionClick = useCallback((connection: SystemConnection) => {
    setLabState(prev => ({
      ...prev,
      selectedConnection: prev.selectedConnection?.id === connection.id ? null : connection,
      selectedSystem: null
    }));
  }, []);

  // UI state handlers
  const handleToggleDataflows = useCallback(() => {
    setLabState(prev => ({
      ...prev,
      showDataflows: !prev.showDataflows
    }));
  }, []);

  const handleToggleThreats = useCallback(() => {
    setLabState(prev => ({
      ...prev,
      showThreats: !prev.showThreats
    }));
  }, []);

  // Validation logic
  const validateConnections = useCallback(() => {
    const validationResults = new Map<string, ConnectionValidation>();

    labState.connections.forEach(userConnection => {
      // Find matching correct connection
      const correctConnection = correctConnections.find(correct =>
        (correct.sourceId === userConnection.sourceId && correct.targetId === userConnection.targetId) ||
        (correct.sourceId === userConnection.targetId && correct.targetId === userConnection.sourceId)
      );

      if (correctConnection) {
        // Check if connection details match (simplified for beginner-friendly approach)
        const typeMatch = correctConnection.connectionType === userConnection.connectionType;
        const dataFlowMatch = correctConnection.dataFlow === userConnection.dataFlow;
        
        let feedback = '';
        let type: ConnectionValidation['type'] = 'correct';

        if (typeMatch && dataFlowMatch) {
          feedback = 'Perfect! This connection is correctly configured.';
          type = 'correct';
        } else {
          type = 'partially_correct';
          const issues: string[] = [];
          if (!typeMatch) issues.push('connection type');
          if (!dataFlowMatch) issues.push('data flow direction');
          feedback = `Connection exists but needs adjustment: ${issues.join(', ')}.`;
        }

        validationResults.set(userConnection.id, {
          isValid: type === 'correct',
          feedback,
          type,
          hint: type !== 'correct' ? 'Check if this should be a physical, network, wireless, or logical connection and verify the data flow direction.' : undefined
        });
      } else {
        // Check if this connection should exist at all
        const shouldExist = correctConnections.some(correct =>
          (correct.sourceId === userConnection.sourceId && correct.targetId === userConnection.targetId) ||
          (correct.sourceId === userConnection.targetId && correct.targetId === userConnection.sourceId)
        );

        validationResults.set(userConnection.id, {
          isValid: false,
          feedback: shouldExist 
            ? 'This connection path is correct but details need adjustment.' 
            : 'This connection may not be necessary for normal operations.',
          type: 'incorrect',
          hint: shouldExist 
            ? 'Review the connection type (physical/network/wireless/logical) and data flow direction.'
            : 'Consider if this connection is required for the systems to operate correctly.'
        });
      }
    });

    // Calculate progress with separate scoring by connection type
    const correctCount = Array.from(validationResults.values()).filter(v => v.type === 'correct').length;
    const totalUserConnections = labState.connections.filter(c => c.userCreated).length;
    
    // Calculate separate scores for different connection types
    const physicalConnections = labState.connections.filter(c => c.connectionType === 'physical' && c.userCreated);
    const networkConnections = labState.connections.filter(c => c.connectionType === 'network' && c.userCreated);
    const logicalConnections = labState.connections.filter(c => c.connectionType === 'logical' && c.userCreated);
    const wirelessConnections = labState.connections.filter(c => c.connectionType === 'wireless' && c.userCreated);
    
    const physicalScore = physicalConnections.length > 0 ? 
      (physicalConnections.filter(c => validationResults.get(c.id)?.type === 'correct').length / physicalConnections.length) * 100 : 0;
    const networkScore = networkConnections.length > 0 ? 
      (networkConnections.filter(c => validationResults.get(c.id)?.type === 'correct').length / networkConnections.length) * 100 : 0;
    const logicalScore = logicalConnections.length > 0 ? 
      (logicalConnections.filter(c => validationResults.get(c.id)?.type === 'correct').length / logicalConnections.length) * 100 : 0;
    const wirelessScore = wirelessConnections.length > 0 ? 
      (wirelessConnections.filter(c => validationResults.get(c.id)?.type === 'correct').length / wirelessConnections.length) * 100 : 0;
    
    // Calculate data flow accuracy
    const dataFlowScore = totalUserConnections > 0 ? 
      (labState.connections.filter(c => c.userCreated && validationResults.get(c.id)?.type === 'correct').length / totalUserConnections) * 100 : 0;

    setLabState(prev => ({
      ...prev,
      validationResults,
      progress: {
        ...prev.progress,
        correctConnections: correctCount,
        assessmentScore: totalUserConnections > 0 ? (correctCount / totalUserConnections) * 100 : 0,
        // Extended progress tracking for separate scores
        physicalConnectionsScore: physicalScore,
        networkConnectionsScore: networkScore,
        logicalConnectionsScore: logicalScore,
        wirelessConnectionsScore: wirelessScore,
        dataFlowScore: dataFlowScore
      }
    }));

    return validationResults;
  }, [labState.connections]);

  // Tutorial management
  const startTutorial = useCallback(() => {
    setLabState(prev => ({
      ...prev,
      tutorialMode: true,
      currentTutorialStep: 0
    }));
  }, []);

  const nextTutorialStep = useCallback(() => {
    setLabState(prev => ({
      ...prev,
      currentTutorialStep: prev.currentTutorialStep + 1
    }));
  }, []);

  const endTutorial = useCallback(() => {
    setLabState(prev => ({
      ...prev,
      tutorialMode: false,
      currentTutorialStep: 0
    }));
  }, []);

  // Progress tracking
  const updateProgress = useCallback((section: LabProgress['currentSection']) => {
    setLabState(prev => ({
      ...prev,
      progress: {
        ...prev.progress,
        currentSection: section,
        completedSections: prev.progress.completedSections.includes(section) 
          ? prev.progress.completedSections 
          : [...prev.progress.completedSections, section]
      }
    }));
  }, []);

  // System analysis
  const analyzeSystem = useCallback((systemId: string) => {
    const system = labState.systems.find(s => s.id === systemId);
    if (system) {
      handleSystemClick(system);
    }
  }, [labState.systems, handleSystemClick]);

  // Reset lab
  const resetLab = useCallback(() => {
    setLabState(prev => ({
      ...prev,
      connections: [],
      selectedSystem: null,
      selectedConnection: null,
      isConnecting: false,
      connectionStart: null,
      validationResults: new Map(),
      progress: {
        currentSection: 'overview',
        completedSections: [],
        correctConnections: 0,
        totalConnections: correctConnections.length,
        assessmentScore: 0,
        timeSpent: 0,
        hintsUsed: 0,
        physicalConnectionsScore: 0,
        networkConnectionsScore: 0,
        logicalConnectionsScore: 0,
        wirelessConnectionsScore: 0,
        dataFlowScore: 0
      }
    }));
  }, []);

  return {
    // State
    systems: labState.systems,
    connections: labState.connections,
    selectedSystem: labState.selectedSystem,
    selectedConnection: labState.selectedConnection,
    hoveredSystem: labState.hoveredSystem,
    showDataflows: labState.showDataflows,
    showThreats: labState.showThreats,
    isConnecting: labState.isConnecting,
    connectionStart: labState.connectionStart,
    progress: labState.progress,
    tutorialMode: labState.tutorialMode,
    currentTutorialStep: labState.currentTutorialStep,
    validationResults: labState.validationResults,

    // Handlers
    handleSystemClick,
    handleSystemHover,
    handleStartConnection,
    handleCompleteConnection,
    handleCancelConnection,
    handleCreateConnection,
    handleUpdateConnection,
    handleDeleteConnection,
    handleConnectionClick,
    handleToggleDataflows,
    handleToggleThreats,
    validateConnections,
    analyzeSystem,
    resetLab,

    // Tutorial
    startTutorial,
    nextTutorialStep,
    endTutorial,
    updateProgress
  };
}