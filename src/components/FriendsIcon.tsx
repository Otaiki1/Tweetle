interface FriendsIconProps {
    color?: string;
}

const FriendsIcon = ({ color = "#787A80" }: FriendsIconProps) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M20.774 18C21.5233 18 22.1193 17.5285 22.6544 16.8691C23.7499 15.5194 21.9513 14.4408 21.2653 13.9126C20.568 13.3756 19.7894 13.0714 19 13M18 11C19.3807 11 20.5 9.88071 20.5 8.5C20.5 7.11929 19.3807 6 18 6"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
            />
            <path
                d="M3.22596 18C2.47665 18 1.88067 17.5285 1.34554 16.8691C0.250091 15.5194 2.04867 14.4408 2.73464 13.9126C3.43197 13.3756 4.21058 13.0714 5 13M5.5 11C4.11929 11 3 9.88071 3 8.5C3 7.11929 4.11929 6 5.5 6"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
            />
            <path
                d="M8.0838 15.1112C7.06202 15.743 4.38298 17.0331 6.0147 18.6474C6.81178 19.436 7.69952 20 8.81562 20H15.1844C16.3005 20 17.1882 19.436 17.9853 18.6474C19.617 17.0331 16.938 15.743 15.9162 15.1112C13.5201 13.6296 10.4798 13.6296 8.0838 15.1112Z"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M15.5 7.5C15.5 9.433 13.933 11 12 11C10.067 11 8.5 9.433 8.5 7.5C8.5 5.567 10.067 4 12 4C13.933 4 15.5 5.567 15.5 7.5Z"
                stroke={color}
                strokeWidth="1.5"
            />
        </svg>
    );
};

export default FriendsIcon;
