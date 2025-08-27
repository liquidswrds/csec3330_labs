class DragDropBoundaryAssignment {
    constructor() {
        this.assignments = new Map(); // elementId -> {functional: area, operational: area}
        this.draggedElement = null;
        this.totalElements = 0;
        
        this.correctAnswers = new Map(); // Loaded from data attributes
        
        this.init();
    }

    init() {
        this.loadCorrectAnswers();
        this.setupDragAndDrop();
        this.setupEventListeners();
        this.updateProgress();
    }

    loadCorrectAnswers() {
        document.querySelectorAll('.drop-zone').forEach(element => {
            const functionalAnswer = element.dataset.correctFunctional;
            const operationalAnswer = element.dataset.correctOperational;
            
            if (functionalAnswer && operationalAnswer) {
                this.correctAnswers.set(element.id, {
                    functional: functionalAnswer,
                    operational: operationalAnswer
                });
                this.totalElements++;
            }
        });
        
        document.getElementById('total-elements').textContent = this.totalElements;
    }

    setupDragAndDrop() {
        // Make labels draggable
        document.querySelectorAll('.draggable-label').forEach(label => {
            label.addEventListener('dragstart', (e) => this.handleDragStart(e));
            label.addEventListener('dragend', (e) => this.handleDragEnd(e));
        });

        // Setup drop zones
        document.querySelectorAll('.drop-zone').forEach(zone => {
            zone.addEventListener('dragover', (e) => this.handleDragOver(e));
            zone.addEventListener('dragenter', (e) => this.handleDragEnter(e));
            zone.addEventListener('dragleave', (e) => this.handleDragLeave(e));
            zone.addEventListener('drop', (e) => this.handleDrop(e));
        });

        // Setup operational-label areas as specific drop zones for operational assignments
        document.querySelectorAll('.operational-label').forEach(label => {
            label.addEventListener('dragover', (e) => this.handleDragOver(e));
            label.addEventListener('dragenter', (e) => this.handleDragEnter(e));
            label.addEventListener('dragleave', (e) => this.handleDragLeave(e));
            label.addEventListener('drop', (e) => this.handleOperationalLabelDrop(e));
        });

        // Add touch support for mobile
        this.setupTouchSupport();
    }

    setupTouchSupport() {
        let touchItem = null;
        let touchOffset = { x: 0, y: 0 };

        document.querySelectorAll('.draggable-label').forEach(label => {
            label.addEventListener('touchstart', (e) => {
                touchItem = label.cloneNode(true);
                touchItem.style.position = 'fixed';
                touchItem.style.pointerEvents = 'none';
                touchItem.style.zIndex = '1000';
                touchItem.classList.add('dragging');
                
                const touch = e.touches[0];
                const rect = label.getBoundingClientRect();
                touchOffset.x = touch.clientX - rect.left;
                touchOffset.y = touch.clientY - rect.top;
                
                document.body.appendChild(touchItem);
                this.draggedElement = { 
                    areaType: label.dataset.areaType, 
                    area: label.dataset.area,
                    element: label 
                };
            });

            label.addEventListener('touchmove', (e) => {
                if (!touchItem) return;
                e.preventDefault();
                
                const touch = e.touches[0];
                touchItem.style.left = (touch.clientX - touchOffset.x) + 'px';
                touchItem.style.top = (touch.clientY - touchOffset.y) + 'px';
            });

            label.addEventListener('touchend', (e) => {
                if (!touchItem) return;
                
                const touch = e.changedTouches[0];
                const element = document.elementFromPoint(touch.clientX, touch.clientY);
                const dropZone = element?.closest('.drop-zone');
                
                if (dropZone) {
                    this.assignAreaToElement(dropZone, this.draggedElement.areaType, this.draggedElement.area);
                }
                
                document.body.removeChild(touchItem);
                touchItem = null;
                this.draggedElement = null;
            });
        });
    }

    handleDragStart(e) {
        this.draggedElement = {
            areaType: e.target.dataset.areaType,
            area: e.target.dataset.area,
            element: e.target
        };
        
        e.target.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'copy';
    }

    handleDragEnd(e) {
        e.target.classList.remove('dragging');
        this.draggedElement = null;
    }

    handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    }

    handleDragEnter(e) {
        e.preventDefault();
        const dropZone = e.target.closest('.drop-zone');
        if (dropZone) {
            dropZone.classList.add('drag-over');
        }
    }

    handleDragLeave(e) {
        const dropZone = e.target.closest('.drop-zone');
        if (dropZone && !dropZone.contains(e.relatedTarget)) {
            dropZone.classList.remove('drag-over');
        }
    }

    handleDrop(e) {
        e.preventDefault();
        const dropZone = e.target.closest('.drop-zone');
        
        if (dropZone && this.draggedElement) {
            dropZone.classList.remove('drag-over');
            
            // Only allow functional assignments on regular drop zones
            if (this.draggedElement.areaType === 'functional') {
                this.assignAreaToElement(dropZone, this.draggedElement.areaType, this.draggedElement.area);
            } else {
                // Show feedback that operational areas should be dropped on labels
                this.showDropHint('Drag operational areas to the operational label areas');
            }
        }
    }

    handleOperationalLabelDrop(e) {
        e.preventDefault();
        const label = e.target.closest('.operational-label');
        const operationalArea = label ? label.closest('.operational-area') : null;
        
        if (operationalArea && this.draggedElement) {
            label.classList.remove('drag-over');
            
            // Only allow operational assignments on operational labels
            if (this.draggedElement.areaType === 'operational') {
                // Update the label text
                label.textContent = this.formatAreaName(this.draggedElement.area) + ' Operations';
                
                // Assign to the operational area and all its children
                this.assignAreaToElement(operationalArea, this.draggedElement.areaType, this.draggedElement.area);
            } else {
                // Show feedback that functional areas should be dropped elsewhere
                this.showDropHint('Drag functional areas to specific systems and areas');
            }
        }
    }

    showDropHint(message) {
        const hint = document.createElement('div');
        hint.className = 'drop-hint';
        hint.textContent = message;
        hint.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #f39c12;
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            font-weight: bold;
            z-index: 1003;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            animation: fadeInOut 3s ease-out forwards;
        `;
        
        document.body.appendChild(hint);
        
        setTimeout(() => {
            if (hint.parentNode) {
                hint.remove();
            }
        }, 3000);
    }

    assignAreaToElement(element, areaType, area) {
        const elementId = element.id;
        
        // Initialize assignment if doesn't exist
        if (!this.assignments.has(elementId)) {
            this.assignments.set(elementId, { functional: null, operational: null });
        }
        
        // Update assignment
        const assignment = this.assignments.get(elementId);
        assignment[areaType] = area;
        
        // Special handling for operational areas - also assign to child elements
        if (areaType === 'operational' && element.classList.contains('operational-area')) {
            const childElements = element.querySelectorAll('.drop-zone:not(.operational-area)');
            childElements.forEach(child => {
                if (!this.assignments.has(child.id)) {
                    this.assignments.set(child.id, { functional: null, operational: null });
                }
                const childAssignment = this.assignments.get(child.id);
                childAssignment.operational = area;
                
                // Update child display but hide operational assignment since it's shown at container level
                this.updateElementDisplay(child, childAssignment, true);
            });
        }
        
        // Update visual display
        this.updateElementDisplay(element, assignment);
        this.updateProgress();
    }

    updateElementDisplay(element, assignment, hideOperational = false) {
        const displayElement = element.querySelector('.assignment-display');
        
        if (assignment.functional || (assignment.operational && !hideOperational)) {
            element.classList.add('has-assignment');
            
            // Clear existing content
            displayElement.innerHTML = '';
            
            // Create functional assignment display
            if (assignment.functional) {
                const functionalSpan = document.createElement('span');
                functionalSpan.className = 'assignment-tag functional-tag';
                functionalSpan.textContent = `F: ${this.formatAreaName(assignment.functional)}`;
                functionalSpan.title = 'Right-click to remove functional assignment';
                functionalSpan.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    this.removeAssignment(element, 'functional');
                });
                functionalSpan.addEventListener('dblclick', (e) => {
                    e.preventDefault();
                    this.removeAssignment(element, 'functional');
                });
                displayElement.appendChild(functionalSpan);
            }
            
            // Create operational assignment display (only if not hidden)
            if (assignment.operational && !hideOperational) {
                if (assignment.functional) {
                    displayElement.appendChild(document.createTextNode(' | '));
                }
                const operationalSpan = document.createElement('span');
                operationalSpan.className = 'assignment-tag operational-tag';
                operationalSpan.textContent = `O: ${this.formatAreaName(assignment.operational)}`;
                operationalSpan.title = 'Right-click to remove operational assignment';
                operationalSpan.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    this.removeAssignment(element, 'operational');
                });
                operationalSpan.addEventListener('dblclick', (e) => {
                    e.preventDefault();
                    this.removeAssignment(element, 'operational');
                });
                displayElement.appendChild(operationalSpan);
            }
            
            // Set display class based on assignment type (considering hidden operational)
            if (assignment.functional && assignment.operational && !hideOperational) {
                displayElement.className = 'assignment-display both';
            } else if (assignment.functional) {
                displayElement.className = 'assignment-display functional';
            } else if (assignment.operational && !hideOperational) {
                displayElement.className = 'assignment-display operational';
            }
        } else {
            element.classList.remove('has-assignment');
            displayElement.innerHTML = '';
        }
    }

    removeAssignment(element, assignmentType) {
        const elementId = element.id;
        const assignment = this.assignments.get(elementId);
        
        if (assignment && assignment[assignmentType]) {
            assignment[assignmentType] = null;
            
            // Special handling for operational area removal
            if (assignmentType === 'operational' && element.classList.contains('operational-area')) {
                // Clear operational label
                const label = element.querySelector('.operational-label');
                if (label) {
                    label.textContent = '';
                }
                
                // Remove operational assignments from child elements and refresh their displays
                const childElements = element.querySelectorAll('.drop-zone:not(.operational-area)');
                childElements.forEach(child => {
                    const childAssignment = this.assignments.get(child.id);
                    if (childAssignment) {
                        childAssignment.operational = null;
                        // Update child display normally (don't hide operational anymore)
                        this.updateElementDisplay(child, childAssignment);
                    }
                });
            }
            
            // Update visual display
            this.updateElementDisplay(element, assignment);
            this.updateProgress();
            
            // If both assignments are null, remove from map
            if (!assignment.functional && !assignment.operational) {
                this.assignments.delete(elementId);
            }
            
            // Show brief feedback
            this.showRemovalFeedback(element, assignmentType);
        }
    }

    showRemovalFeedback(element, assignmentType) {
        const feedback = document.createElement('div');
        feedback.className = 'removal-feedback';
        feedback.textContent = `${this.formatAreaName(assignmentType)} assignment removed`;
        
        const rect = element.getBoundingClientRect();
        feedback.style.position = 'fixed';
        feedback.style.left = rect.left + 'px';
        feedback.style.top = (rect.top - 30) + 'px';
        feedback.style.background = '#e74c3c';
        feedback.style.color = 'white';
        feedback.style.padding = '0.3rem 0.6rem';
        feedback.style.borderRadius = '4px';
        feedback.style.fontSize = '0.8rem';
        feedback.style.zIndex = '1002';
        feedback.style.pointerEvents = 'none';
        feedback.style.animation = 'fadeInOut 2s ease-out forwards';
        
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.remove();
            }
        }, 2000);
    }

    formatAreaName(area) {
        return area.charAt(0).toUpperCase() + area.slice(1);
    }

    updateProgress() {
        let functionalAssigned = 0;
        let operationalAssigned = 0;
        let totalAssignments = 0;
        
        this.assignments.forEach((assignment) => {
            if (assignment.functional) functionalAssigned++;
            if (assignment.operational) operationalAssigned++;
            if (assignment.functional) totalAssignments++;
            if (assignment.operational && !assignment.functional) totalAssignments++;
        });
        
        const totalPossible = this.totalElements  // Both functional and operational for each element
        const percentage = totalPossible > 0 ? (totalAssignments / totalPossible) * 100 : 0;
        
        document.getElementById('assigned-count').textContent = `${functionalAssigned + operationalAssigned}`;
        document.getElementById('total-elements').textContent = totalPossible;
        document.getElementById('progress-fill').style.width = percentage + '%';
        
        // Update the progress text to show breakdown
        const progressText = document.querySelector('.assignment-status p');
        if (progressText) {
            progressText.innerHTML = `
                <span id="assigned-count">${functionalAssigned + operationalAssigned}</span> of 
                <span id="total-elements">${totalPossible}</span> assignments completed<br>
                <small>Functional: ${functionalAssigned}/${this.totalElements} • Operational: ${operationalAssigned}/${this.totalElements}</small>
            `;
        }
    }

    setupEventListeners() {
        document.getElementById('reset-analysis').addEventListener('click', () => this.resetAllAssignments());
        document.getElementById('check-answers').addEventListener('click', () => this.checkAnswers());
    }

    resetAllAssignments() {
        this.assignments.clear();
        
        document.querySelectorAll('.drop-zone').forEach(element => {
            element.classList.remove('has-assignment', 'correct-assignment', 'incorrect-assignment');
            const displayElement = element.querySelector('.assignment-display');
            if (displayElement) {
                displayElement.textContent = '';
                displayElement.className = 'assignment-display';
            }
        });
        
        this.updateProgress();
        this.hideResults();
    }

    checkAnswers() {
        let functionalCorrect = 0;
        let operationalCorrect = 0;
        let totalCorrect = 0;
        const feedback = [];
        
        console.log('Starting answer check...');
        console.log('Total elements:', this.totalElements);
        console.log('Current assignments:', this.assignments);
        console.log('Correct answers:', this.correctAnswers);
        
        // Show correct answers in instruction panel
        this.showAnswersInInstructions();
        
        // Don't change colors of main areas - just provide feedback
        this.correctAnswers.forEach((correct, elementId) => {
            const assignment = this.assignments.get(elementId) || { functional: null, operational: null };
            const element = document.getElementById(elementId);
            
            if (!element) {
                console.error(`Element not found: ${elementId}`);
                return;
            }
            
            const elementName = this.getElementDisplayName(element);
            
            let functionalIsCorrect = false;
            let operationalIsCorrect = false;
            let feedbackText = `${elementName}: `;
            
            console.log(`Checking ${elementId}: assigned=${JSON.stringify(assignment)}, correct=${JSON.stringify(correct)}`);
            
            // Check functional assignment
            if (assignment.functional === correct.functional) {
                functionalIsCorrect = true;
                functionalCorrect++;
                feedbackText += `✓ Functional (${this.formatAreaName(correct.functional)})`;
            } else {
                if (!assignment.functional) {
                    feedbackText += `⚠ Functional (Missing - Expected: ${this.formatAreaName(correct.functional)})`;
                } else {
                    feedbackText += `✗ Functional (Expected: ${this.formatAreaName(correct.functional)}, Got: ${this.formatAreaName(assignment.functional)})`;
                }
            }
            
            // Check operational assignment
            if (assignment.operational === correct.operational) {
                operationalIsCorrect = true;
                operationalCorrect++;
                feedbackText += ` | ✓ Operational (${this.formatAreaName(correct.operational)})`;
            } else {
                if (!assignment.operational) {
                    feedbackText += ` | ⚠ Operational (Missing - Expected: ${this.formatAreaName(correct.operational)})`;
                } else {
                    feedbackText += ` | ✗ Operational (Expected: ${this.formatAreaName(correct.operational)}, Got: ${this.formatAreaName(assignment.operational)})`;
                }
            }
            
            // Just track results, no visual changes to main areas
            if (functionalIsCorrect && operationalIsCorrect) {
                totalCorrect++;
                feedback.push({ text: feedbackText, correct: true, type: 'correct' });
                console.log(`${elementId}: CORRECT`);
            } else if (!assignment.functional || !assignment.operational) {
                feedback.push({ text: feedbackText, correct: false, type: 'incomplete' });
                console.log(`${elementId}: INCOMPLETE`);
            } else {
                feedback.push({ text: feedbackText, correct: false, type: 'incorrect' });
                console.log(`${elementId}: INCORRECT`);
            }
        });
        
        console.log(`Results: Functional: ${functionalCorrect}/${this.totalElements}, Operational: ${operationalCorrect}/${this.totalElements}, Total: ${totalCorrect}/${this.totalElements}`);
        
        this.showResults(totalCorrect, feedback, functionalCorrect, operationalCorrect);
    }
    
    showAnswersInInstructions() {
        // Group answers by functional and operational areas
        const functionalGroups = {
            production: [],
            control: [],
            monitoring: [],
            logistics: [],
            maintenance: [],
            quality: []
        };
        
        const operationalGroups = {
            manufacturing: [],
            support: [],
            external: [],
            network: []
        };
        
        // Collect answers
        this.correctAnswers.forEach((correct, elementId) => {
            const element = document.getElementById(elementId);
            const elementName = this.getElementDisplayName(element);
            
            if (correct.functional && functionalGroups[correct.functional]) {
                functionalGroups[correct.functional].push(elementName);
            }
            if (correct.operational && operationalGroups[correct.operational]) {
                operationalGroups[correct.operational].push(elementName);
            }
        });
        
        // Update instruction panel with answers
        Object.entries(functionalGroups).forEach(([area, elements]) => {
            const hintElement = document.getElementById(`${area}-hint`);
            if (hintElement && elements.length > 0) {
                hintElement.textContent = `(${elements.join(', ')})`;
            }
        });
        
        Object.entries(operationalGroups).forEach(([area, elements]) => {
            const hintElement = document.getElementById(`${area}-hint`);
            if (hintElement && elements.length > 0) {
                hintElement.textContent = `(${elements.join(', ')})`;
            }
        });
    }
    
    getElementDisplayName(element) {
        const h3 = element.querySelector('h3');
        const h4 = element.querySelector('h4');
        if (h3) return h3.textContent;
        if (h4) return h4.textContent;
        return element.textContent.trim().split('\n')[0];
    }
    
    showResults(correctCount, feedback, functionalCorrect = 0, operationalCorrect = 0) {
        const score = this.totalElements > 0 ? Math.round((correctCount / this.totalElements) * 100) : 0;
        const functionalScore = this.totalElements > 0 ? Math.round((functionalCorrect / this.totalElements) * 100) : 0;
        const operationalScore = this.totalElements > 0 ? Math.round((operationalCorrect / this.totalElements) * 100) : 0;
        const isComplete = correctCount === this.totalElements;
        
        // Update score display with color coding
        const scoreElement = document.getElementById('score');
        scoreElement.innerHTML = `
            <div class="main-score">${score}%</div>
            <div class="score-breakdown">
                <small>Functional: ${functionalScore}% • Operational: ${operationalScore}%</small>
            </div>
        `;
        scoreElement.className = isComplete ? 'perfect-score' : (score >= 70 ? 'good-score' : 'needs-improvement');
        
        // Show completion celebration if perfect score
        if (isComplete) {
            this.showCompletionCelebration();
        }
        
        // Clear and populate feedback list
        const feedbackList = document.getElementById('feedback-list');
        feedbackList.innerHTML = '';
        
        // Add summary header
        const summaryItem = document.createElement('li');
        summaryItem.className = 'feedback-summary';
        if (isComplete) {
            summaryItem.innerHTML = '🎉 <strong>Excellent! All assignments are correct!</strong>';
        } else {
            const incompleteElements = this.totalElements - correctCount;
            summaryItem.innerHTML = `
                📊 <strong>Overall Progress:</strong> ${correctCount}/${this.totalElements} elements complete (${score}%)<br>
                📋 <strong>By Category:</strong> Functional ${functionalCorrect}/${this.totalElements} (${functionalScore}%) • Operational ${operationalCorrect}/${this.totalElements} (${operationalScore}%)
            `;
            if (incompleteElements > 0) {
                summaryItem.innerHTML += `<br>⚠️ <strong>${incompleteElements} elements</strong> need more work`;
            }
        }
        feedbackList.appendChild(summaryItem);
        
        // Add detailed feedback
        feedback.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item.text;
            li.classList.add(item.type);
            feedbackList.appendChild(li);
        });
        
        // Add encouragement message
        if (!isComplete) {
            const encouragementItem = document.createElement('li');
            encouragementItem.className = 'feedback-encouragement';
            if (score >= 80) {
                encouragementItem.innerHTML = '💪 <em>Almost there! Review the feedback above and make the final corrections.</em>';
            } else if (score >= 50) {
                encouragementItem.innerHTML = '👍 <em>Good progress! Focus on the incomplete and incorrect items above.</em>';
            } else {
                encouragementItem.innerHTML = '🎯 <em>Keep going! Try dragging more labels to complete your assignments.</em>';
            }
            feedbackList.appendChild(encouragementItem);
        }
        
        document.getElementById('results-summary').style.display = 'block';
        
        // Scroll to results
        document.getElementById('results-summary').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
        
        // Update check answers button text
        const checkButton = document.getElementById('check-answers');
        if (isComplete) {
            checkButton.textContent = 'Lab Complete! 🎉';
            checkButton.disabled = true;
            checkButton.style.background = '#27ae60';
        } else {
            checkButton.textContent = 'Check Answers Again';
            checkButton.disabled = false;
            checkButton.style.background = '#3498db';
        }
    }
    
    showCompletionCelebration() {
        // Create celebration overlay
        const celebration = document.createElement('div');
        celebration.className = 'completion-celebration';
        celebration.innerHTML = `
            <div class="celebration-content">
                <div class="celebration-icon">🎉</div>
                <h2>Congratulations!</h2>
                <p>You have successfully completed the Cookie Factory Boundary Analysis Lab!</p>
                <div class="celebration-stats">
                    <div class="stat">
                        <span class="stat-number">100%</span>
                        <span class="stat-label">Score</span>
                    </div>
                    <div class="stat">
                        <span class="stat-number">${this.totalElements}</span>
                        <span class="stat-label">Elements Analyzed</span>
                    </div>
                </div>
                <p class="celebration-message">
                    You've demonstrated excellent understanding of functional and operational boundary analysis 
                    in industrial systems. Well done!
                </p>
                <button onclick="this.parentElement.parentElement.remove()" class="celebration-close">
                    Continue
                </button>
            </div>
        `;
        
        document.body.appendChild(celebration);
        
        // Add confetti animation
        this.createConfetti();
        
        // Auto-remove after 10 seconds if not manually closed
        setTimeout(() => {
            if (celebration.parentNode) {
                celebration.remove();
            }
        }, 10000);
    }
    
    createConfetti() {
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.background = ['#f39c12', '#3498db', '#e74c3c', '#27ae60', '#9b59b6'][Math.floor(Math.random() * 5)];
                confetti.style.animationDelay = Math.random() * 3 + 's';
                confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
                
                document.body.appendChild(confetti);
                
                setTimeout(() => {
                    if (confetti.parentNode) {
                        confetti.remove();
                    }
                }, 5000);
            }, i * 100);
        }
    }
    
    hideResults() {
        document.getElementById('results-summary').style.display = 'none';
    }
}

// Tutorial and help system
class TutorialSystem {
    constructor() {
        this.currentStep = 0;
        this.isActive = false;
        this.steps = [
            {
                target: '.draggable-label[data-area-type="functional"]',
                message: 'Drag these functional area labels to identify what each system does'
            },
            {
                target: '.draggable-label[data-area-type="operational"]',
                message: 'Drag these operational area labels to identify how systems are organized'
            },
            {
                target: '.drop-zone',
                message: 'Drop the labels onto factory elements to assign their boundaries'
            },
            {
                target: '#check-answers',
                message: 'Click "Check Answers" when you\'ve assigned both functional and operational areas'
            }
        ];
    }

    startTutorial() {
        this.currentStep = 0;
        this.isActive = true;
        this.showNextHint();
    }
    
    showNextHint() {
        if (this.currentStep >= this.steps.length) {
            console.log('Tutorial completed - no more steps');
            return;
        }
        
        const step = this.steps[this.currentStep];
        const element = document.querySelector(step.target);
        
        console.log(`Tutorial step ${this.currentStep + 1}: Target: ${step.target}, Element found:`, element);
        
        if (element) {
            this.createTooltip(element, step.message);
        } else {
            console.error(`Tutorial step ${this.currentStep + 1}: Could not find element with selector: ${step.target}`);
        }
    }
    
    createTooltip(element, message) {
        // Remove any existing tooltip first
        const existingTooltip = document.querySelector('.tutorial-tooltip');
        if (existingTooltip) {
            existingTooltip.remove();
        }

        const tooltip = document.createElement('div');
        tooltip.className = 'tutorial-tooltip';
        
        // Check if this is the last step
        const isLastStep = this.currentStep >= this.steps.length - 1;
        const buttonText = isLastStep ? 'Finish Tutorial' : 'Next';
        
        tooltip.innerHTML = `
            <div class="tooltip-content">
                <p>${message}</p>
                <div class="tooltip-progress">Step ${this.currentStep + 1} of ${this.steps.length}</div>
                <button class="tooltip-next-btn">${buttonText}</button>
            </div>
            <div class="tooltip-arrow"></div>
        `;
        
        tooltip.style.cssText = `
            position: fixed;
            background: #2c3e50;
            color: white;
            padding: 1rem;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            z-index: 1001;
            max-width: min(300px, calc(100vw - 20px));
            opacity: 0;
            transform: scale(0.8);
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(tooltip);
        
        // Get actual dimensions after adding to DOM
        const tooltipRect = tooltip.getBoundingClientRect();
        const tooltipWidth = tooltipRect.width;
        const tooltipHeight = tooltipRect.height;
        
        const elementRect = element.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const scrollY = window.scrollY;
        const scrollX = window.scrollX;
        
        // Special handling for elements in sticky containers (like the controls sidebar)
        const isInStickyContainer = element.closest('.controls') !== null;
        const stickyOffset = isInStickyContainer ? 10 : 0; // Extra margin for sticky elements
        
        // Calculate available space in all directions
        const spaceAbove = elementRect.top;
        const spaceBelow = viewportHeight - elementRect.bottom;
        const spaceLeft = elementRect.left;
        const spaceRight = viewportWidth - elementRect.right;
        
        // Add minimum margin for better appearance
        const margin = 15 + stickyOffset;
        const requiredSpaceVertical = tooltipHeight + margin;
        const requiredSpaceHorizontal = tooltipWidth + margin;
        
        let position = 'bottom'; // default
        let left = 0;
        let top = 0;
        
        // Determine best position based on available space - prioritize positions that keep tooltip fully visible
        if (spaceAbove >= requiredSpaceVertical) {
            // Place above (preferred for bottom elements like buttons)
            position = 'top';
            top = elementRect.top + scrollY - tooltipHeight - margin;
        } else if (spaceBelow >= requiredSpaceVertical) {
            // Place below
            position = 'bottom';
            top = elementRect.bottom + scrollY + margin;
        } else if (spaceRight >= requiredSpaceHorizontal && spaceRight > spaceLeft) {
            // Place to the right (prefer right over left if both available)
            position = 'right';
            left = elementRect.right + scrollX + margin;
            top = elementRect.top + scrollY + (elementRect.height - tooltipHeight) / 2;
        } else if (spaceLeft >= requiredSpaceHorizontal) {
            // Place to the left
            position = 'left';
            left = elementRect.left + scrollX - tooltipWidth - margin;
            top = elementRect.top + scrollY + (elementRect.height - tooltipHeight) / 2;
        } else {
            // Fallback: place in best available position even if partially clipped
            // This handles cases where the element is too close to all edges
            
            if (spaceAbove > spaceBelow) {
                // Force above if more space above
                position = 'top';
                top = Math.max(scrollY + 10, elementRect.top + scrollY - tooltipHeight - 5);
            } else if (spaceBelow > 50) {
                // Force below if reasonable space
                position = 'bottom';
                top = elementRect.bottom + scrollY + 5;
            } else if (spaceRight > spaceLeft && spaceRight > 100) {
                // Force right if more space
                position = 'right';
                left = elementRect.right + scrollX + 10;
                top = Math.max(scrollY + 10, 
                    Math.min(elementRect.top + scrollY, 
                        scrollY + viewportHeight - tooltipHeight - 10));
            } else {
                // Last resort: viewport center
                position = 'center';
                left = Math.max(10 + scrollX, (viewportWidth - tooltipWidth) / 2 + scrollX);
                top = Math.max(10 + scrollY, (viewportHeight - tooltipHeight) / 2 + scrollY);
            }
        }
        
        // Calculate horizontal position for top/bottom placements
        if (position === 'top' || position === 'bottom') {
            left = elementRect.left + scrollX + (elementRect.width - tooltipWidth) / 2;
            
            // Ensure tooltip stays within viewport horizontally
            const minLeft = 10 + scrollX;
            const maxLeft = viewportWidth - tooltipWidth - 10 + scrollX;
            left = Math.max(minLeft, Math.min(left, maxLeft));
        }
        
        // Ensure tooltip stays within viewport vertically for side placements
        if (position === 'left' || position === 'right') {
            const minTop = 10 + scrollY;
            const maxTop = viewportHeight - tooltipHeight - 10 + scrollY;
            top = Math.max(minTop, Math.min(top, maxTop));
        }
        
        // Set final position
        tooltip.style.left = left + 'px';
        tooltip.style.top = top + 'px';
        
        // Add arrow styling based on position
        const arrow = tooltip.querySelector('.tooltip-arrow');
        if (arrow && position !== 'center') {
            const arrowSize = 8;
            arrow.style.cssText = `
                position: absolute;
                width: 0;
                height: 0;
                border: ${arrowSize}px solid transparent;
            `;
            
            switch (position) {
                case 'bottom':
                    arrow.style.top = `-${arrowSize * 2}px`;
                    arrow.style.left = `${Math.max(arrowSize, Math.min(tooltipWidth - arrowSize * 2, elementRect.left + elementRect.width / 2 - left))}px`;
                    arrow.style.borderBottomColor = '#2c3e50';
                    break;
                case 'top':
                    arrow.style.bottom = `-${arrowSize * 2}px`;
                    arrow.style.left = `${Math.max(arrowSize, Math.min(tooltipWidth - arrowSize * 2, elementRect.left + elementRect.width / 2 - left))}px`;
                    arrow.style.borderTopColor = '#2c3e50';
                    break;
                case 'right':
                    arrow.style.left = `-${arrowSize * 2}px`;
                    arrow.style.top = `${Math.max(arrowSize, Math.min(tooltipHeight - arrowSize * 2, elementRect.top + elementRect.height / 2 - top))}px`;
                    arrow.style.borderRightColor = '#2c3e50';
                    break;
                case 'left':
                    arrow.style.right = `-${arrowSize * 2}px`;
                    arrow.style.top = `${Math.max(arrowSize, Math.min(tooltipHeight - arrowSize * 2, elementRect.top + elementRect.height / 2 - top))}px`;
                    arrow.style.borderLeftColor = '#2c3e50';
                    break;
            }
        }
        
        // Animate tooltip in
        requestAnimationFrame(() => {
            tooltip.style.opacity = '1';
            tooltip.style.transform = 'scale(1)';
        });

        // Add click event listener to the next button
        const nextButton = tooltip.querySelector('.tooltip-next-btn');
        nextButton.addEventListener('click', () => {
            console.log(`Next clicked. Current step: ${this.currentStep}, Moving to step: ${this.currentStep + 1}`);
            
            // Animate out and remove
            tooltip.style.opacity = '0';
            tooltip.style.transform = 'scale(0.8)';
            setTimeout(() => {
                if (tooltip.parentNode) {
                    tooltip.remove();
                }
            }, 300);
            
            this.currentStep++;
            console.log(`Total steps: ${this.steps.length}, New current step: ${this.currentStep}`);
            if (this.currentStep < this.steps.length) {
                setTimeout(() => this.showNextHint(), 300);
            } else {
                console.log('Tutorial completed');
                this.isActive = false;
            }
        });
        
        // Close tooltip on escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                tooltip.style.opacity = '0';
                tooltip.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    if (tooltip.parentNode) {
                        tooltip.remove();
                    }
                }, 300);
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
        
        // Update position on window resize and scroll
        const handleResize = () => {
            if (tooltip.parentNode) {
                // Recalculate position using the same logic
                const newElementRect = element.getBoundingClientRect();
                const newTooltipRect = tooltip.getBoundingClientRect();
                const newViewportWidth = window.innerWidth;
                const newViewportHeight = window.innerHeight;
                const newScrollY = window.scrollY;
                const newScrollX = window.scrollX;
                
                const newSpaceAbove = newElementRect.top;
                const newSpaceBelow = newViewportHeight - newElementRect.bottom;
                const margin = 15;
                
                let newTop, newLeft;
                
                // Use same prioritization: above first for bottom elements
                if (newSpaceAbove >= newTooltipRect.height + margin) {
                    newTop = newElementRect.top + newScrollY - newTooltipRect.height - margin;
                    newLeft = newElementRect.left + newScrollX + (newElementRect.width - newTooltipRect.width) / 2;
                } else if (newSpaceBelow >= newTooltipRect.height + margin) {
                    newTop = newElementRect.bottom + newScrollY + margin;
                    newLeft = newElementRect.left + newScrollX + (newElementRect.width - newTooltipRect.width) / 2;
                } else {
                    // Force above with constraints
                    newTop = Math.max(newScrollY + 10, newElementRect.top + newScrollY - newTooltipRect.height - 5);
                    newLeft = newElementRect.left + newScrollX + (newElementRect.width - newTooltipRect.width) / 2;
                }
                
                // Ensure horizontal bounds
                const minLeft = 10 + newScrollX;
                const maxLeft = newViewportWidth - newTooltipRect.width - 10 + newScrollX;
                newLeft = Math.max(minLeft, Math.min(newLeft, maxLeft));
                
                tooltip.style.top = newTop + 'px';
                tooltip.style.left = newLeft + 'px';
            }
        };
        
        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleResize); // Reuse resize logic for scroll
        
        // Clean up event listeners when tooltip is removed
        const originalRemove = tooltip.remove;
        tooltip.remove = function() {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleResize);
            document.removeEventListener('keydown', handleEscape);
            originalRemove.call(this);
        };
    }
}

// Enhanced scenario information system
class ScenarioManager {
    constructor() {
        this.scenarioData = {
            description: `
                You are analyzing the Cookie Manufacturing Company's production facility. 
                This facility produces cookies through an automated process involving three main production stages.
                Your task is to identify functional areas (what each system does) and operational areas (how systems are organized).
            `,
            
            functionalAreas: {
                production: "Systems directly involved in creating the final product",
                control: "Systems that manage, coordinate, and direct operations",
                monitoring: "Systems that observe, measure, and report on processes",
                logistics: "Systems that handle material flow and supply chain",
                maintenance: "Systems responsible for equipment upkeep and repair",
                quality: "Systems that ensure product quality and safety standards"
            },
            
            operationalAreas: {
                manufacturing: "Core production operations within the factory",
                support: "Supporting functions that enable production",
                external: "Operations outside the organization's direct control",
                network: "IT infrastructure and communication systems"
            }
        };
    }
    
    showScenarioHelp() {
        // This could be expanded to show contextual help
        console.log('Scenario help system ready');
    }
}

// Initialize the application
let assignment, tutorial, scenario;

document.addEventListener('DOMContentLoaded', () => {
    assignment = new DragDropBoundaryAssignment();
    tutorial = new TutorialSystem();
    scenario = new ScenarioManager();
    
    // Setup tutorial button event listener
    document.getElementById('tutorial-button').addEventListener('click', () => {
        tutorial.startTutorial();
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'r' && e.ctrlKey) {
            e.preventDefault();
            assignment.resetAllAssignments();
        }
        if (e.key === 'Enter' && e.ctrlKey) {
            e.preventDefault();
            assignment.checkAnswers();
        }
    });
    
    // Prevent default drag behavior on images and other elements
    document.addEventListener('dragstart', (e) => {
        if (!e.target.classList.contains('draggable-label')) {
            e.preventDefault();
        }
    });
});