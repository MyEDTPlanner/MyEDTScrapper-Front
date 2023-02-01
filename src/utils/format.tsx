
export const formatAttendeeName = ({firstname, lastname}: {firstname: string | null, lastname: string | null}) => {
    return [firstname, lastname].join(' ');
};

export const formatTitleAbbreviation = (title: string) => {
    let words = title.split(' ');
    words = words.filter((word) => word.length > 2);
    return words.map((word) => word[0]).join('');
};
