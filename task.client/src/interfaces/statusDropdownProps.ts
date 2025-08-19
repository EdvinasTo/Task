export default interface StatusDropdownProps {
    status: string;
    availableTransitions: string[];
    onChange: (newStatus: string) => void;
}