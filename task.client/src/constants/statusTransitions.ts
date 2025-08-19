const statusTransitions: Record<string, string[]> = {
    Created: ['Sent', 'Canceled'],
    Sent: ['Accepted', 'Returned', 'Canceled'],
    Returned: ['Sent', 'Canceled'],
    Accepted: [],
    Canceled: [],
};
export default statusTransitions;