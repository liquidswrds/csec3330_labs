# Interconnection & Dataflow Analysis Lab

## Overview

The Interconnection & Dataflow Analysis Lab is an interactive cybersecurity learning module that teaches students how to identify, analyze, and assess security risks in industrial control system interconnections. Built for the CSEC 3330 Industrial System Security course, this lab provides hands-on experience with realistic factory systems and cybersecurity concepts.

## Learning Objectives

Students will learn to:

1. **Map System Interconnections**: Identify and create connections between industrial control systems, sensors, and infrastructure components
2. **Analyze Data Flows**: Understand different types of data flowing between systems and their security implications
3. **Assess Security Risks**: Evaluate potential attack vectors and security vulnerabilities in interconnected systems
4. **Apply Cybersecurity Principles**: Use industry-standard protocols and security best practices in system design

## Lab Features

### 🏭 Interactive Factory Visualization
- **Responsive SVG Layout**: Scalable factory floor with zoom, pan, and navigation controls
- **System Classification**: Color-coded systems by type (Production, Support, Business, Infrastructure)
- **Zone-Based Organization**: Systems organized by physical location (Production Floor, Control Room, Server Room, Office)
- **Real-Time Interaction**: Click to select systems, double-click to start connections

### 🔗 Connection Mapping System
- **Drag-and-Drop Interface**: Intuitive connection creation between systems
- **Connection Types**: Physical, Network, Wireless, and Logical connections
- **Protocol Selection**: Choose from 13+ industry-standard protocols (OPC UA, Modbus TCP, EtherNet/IP, etc.)
- **Security Configuration**: Set appropriate security levels and data flow directions
- **Real-Time Validation**: Immediate feedback on connection accuracy and security implications

### 📊 Dataflow Analysis Panel
- **Multi-Tab Interface**: Separate views for Data Flows, Threats, Risk Analysis, and System Information
- **Threat Assessment**: Comprehensive security threat analysis with severity ratings
- **Risk Scoring**: Automated risk calculations based on system criticality and security configurations
- **Data Classification**: Categorization of information by sensitivity and criticality levels

### ✅ Assessment & Validation
- **Connection Validation**: Check student-created connections against correct industry configurations
- **Knowledge Quiz**: 5 scenario-based questions covering cybersecurity concepts
- **Progressive Scoring**: Real-time feedback with detailed explanations
- **Results Export**: JSON export of lab results for instructor review

### 🎓 Guided Learning Experience
- **Interactive Tutorial**: Step-by-step introduction to lab concepts and interface
- **Contextual Help**: Built-in keyboard navigation and accessibility instructions
- **Progressive Difficulty**: Beginner to advanced concepts with appropriate scaffolding
- **Industry Scenarios**: Realistic threats and configurations based on actual industrial standards

## Technical Architecture

### Component Structure
```
interconnection-lab/
├── components/
│   ├── InterconnectionLab.tsx          # Main lab component
│   ├── FactoryVisualization.tsx        # SVG-based factory layout
│   ├── ConnectionMapper.tsx            # Connection creation interface
│   ├── DataflowAnalysisPanel.tsx       # Analysis and threat assessment
│   ├── AssessmentPanel.tsx             # Quiz and validation
│   ├── TutorialModal.tsx               # Guided tutorial system
│   └── KeyboardNavigationModal.tsx     # Accessibility help
├── hooks/
│   └── useInterconnectionLabState.ts   # State management
├── data/
│   └── factoryData.ts                  # Factory systems and connections
├── types.ts                            # TypeScript definitions
└── README.md                           # This documentation
```

### Key Technologies
- **React 18+** with functional components and hooks
- **TypeScript** for type safety and better development experience
- **Mantine UI** for consistent, accessible components
- **SVG Graphics** for scalable, interactive visualizations
- **Vite** for fast development and optimized builds

### State Management
The lab uses a centralized state management system with `useInterconnectionLabState` hook that manages:
- System and connection data
- User interactions and selections
- Tutorial progress and validation results
- Assessment scores and progress tracking

## Factory Scenario: SweetTech Cookie Manufacturing

The lab is set in a realistic cookie manufacturing facility with:

### System Categories

#### 🏭 Production Systems (Green)
- Recipe Management System
- Mixing Station Controller
- Baking Oven Temperature Controller
- Packaging Line Automation
- Temperature & Quality Sensors
- Production Line Cameras

#### 🔧 Support Systems (Blue)
- Inventory Management System
- HVAC Control System
- Security Camera Network
- Access Control System

#### 💼 Business Systems (Orange)
- ERP System
- Customer Order Management
- Supply Chain Coordination
- Employee Management System

#### 🌐 Infrastructure (Purple)
- Industrial Network Switch
- Corporate Firewall
- OT Network Firewall
- Active Directory Server
- Wireless Access Points
- Data Historian Server

### External Systems
- Flour Supplier System
- Packaging Supplier
- External Quality Lab

## Assessment Criteria

### Connection Mapping (60% of grade)
- **Protocol Accuracy**: Correct industrial protocols for each connection type
- **Security Configuration**: Appropriate security levels and authentication
- **Data Flow Direction**: Proper unidirectional vs. bidirectional configurations
- **Network Segmentation**: Correct IT/OT separation and zone boundaries

### Knowledge Assessment (40% of grade)
- **Multiple Choice Questions**: Cybersecurity concepts and best practices
- **Scenario Analysis**: Real-world threat identification and mitigation
- **Industrial Standards**: Understanding of IEC 62443, NIST frameworks
- **Risk Assessment**: Ability to evaluate and prioritize security risks

### Grading Scale
- **90-100%**: Excellent - Comprehensive understanding of industrial cybersecurity
- **80-89%**: Good - Solid grasp of core concepts with minor gaps
- **70-79%**: Fair - Basic understanding with areas for improvement
- **Below 70%**: Needs Improvement - Requires additional study and practice

## Accessibility Features

### WCAG 2.1 AA Compliance
- **Semantic HTML**: Proper heading hierarchy and ARIA landmarks
- **Keyboard Navigation**: Full keyboard accessibility for all interactions
- **Screen Reader Support**: Comprehensive announcements and labels
- **High Contrast**: Support for high contrast mode and custom themes
- **Focus Indicators**: Clear visual focus indicators for all interactive elements
- **Alternative Text**: Descriptive alt text for all visual elements

### Keyboard Shortcuts
- `Tab` / `Shift+Tab`: Navigate between elements
- `Enter` / `Space`: Activate buttons and controls
- `C`: Start connection mode
- `V`: Validate connections
- `H`: Open tutorial
- `Escape`: Cancel current operation

## Installation and Setup

### Prerequisites
- Node.js 16+ and npm
- Modern web browser with ES2020+ support
- TypeScript knowledge for development

### Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Type checking
npm run type-check
```

### Integration
The lab integrates with the existing CSEC 3330 course structure:
- Routing: `/lab/2.1` for Interconnection Lab
- Dashboard integration with course navigation
- Consistent theming and accessibility standards
- Shared components and utilities

## Educational Standards Alignment

### Industry Standards
- **IEC 62443**: Industrial communication networks cybersecurity
- **NIST Cybersecurity Framework**: Identify, Protect, Detect, Respond, Recover
- **ISA/IEC 62443-3-3**: System security requirements and security levels
- **NERC CIP**: Critical Infrastructure Protection standards

### Learning Taxonomies
- **Bloom's Taxonomy**: Analysis and evaluation of system interconnections
- **Cybersecurity Workforce Framework (NICE)**: Specialty areas in cybersecurity
- **Industrial Automation Competencies**: Hands-on experience with real systems

## Future Enhancements

### Planned Features
- **Multi-User Collaboration**: Team-based lab exercises
- **Advanced Scenarios**: More complex factory configurations
- **Integration Testing**: Simulated network traffic and attacks
- **Mobile Optimization**: Enhanced touch interface for tablets
- **Instructor Dashboard**: Analytics and progress tracking tools

### Extension Points
- **Custom Factory Layouts**: Configurable scenarios for different industries
- **Additional Protocols**: Support for emerging industrial communication standards
- **Advanced Threat Modeling**: Integration with threat intelligence feeds
- **Certification Preparation**: Alignment with industry certification requirements

## Support and Resources

### Documentation
- [Accessibility Guide](../../ACCESSIBILITY_GUIDE.md)
- [Contributing Guidelines](../../../../CONTRIBUTING.md)
- [Development Setup](../../../../README.md)

### Standards References
- [IEC 62443 Industrial Cybersecurity](https://www.isa.org/standards-and-publications/isa-standards/isa-iec-62443-series-of-standards)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)
- [OWASP Industrial Control Systems](https://owasp.org/www-project-industrial-control-system-security/)

### Contact
For technical issues, accessibility concerns, or educational content questions, please contact the course instructor or submit an issue through the course management system.

---

**Last Updated**: August 2025  
**Version**: 1.0.0  
**License**: MIT  
**Authors**: Course Development Team