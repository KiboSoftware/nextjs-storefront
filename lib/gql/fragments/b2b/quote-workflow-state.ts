export const quoteWorkflowStateFragment = `
fragment quoteWorkflowStateFragment on QuoteWorkflowState {
    containerId
    processDefinitionId
    processInstanceId
    assignedGroupCode
    processVariables
    processVariables
    tasks {
        taskInstanceId
        taskName
        isActive
        inputMappings
        inputValues
        outputMappings
    }
}
`
