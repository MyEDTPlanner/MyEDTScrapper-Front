
export const formatAttendeeName = ({firstname, lastname}: {firstname: string | null, lastname: string | null}) => {
    return [firstname, lastname].join(' ');
};

export const formatTitleAbbreviation = (title: string): String => {
    let words = title.split(' ');
    words = words.filter((word) => word.length > 2);
    return words.map((word) => word[0]).join('');
};

export const formatDate = (date: Date): String => {
    return date.toLocaleDateString();
}

export const formatTime = (date: Date): String => {
    return date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
    });
}