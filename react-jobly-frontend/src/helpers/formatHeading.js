function formatHeading(history) {
    const path = history.location.pathname;
    const trimmedPath = path.replace(/[/\-]/g, ' ');
    let words = trimmedPath.split(' ');

    // Removes "" at beginning and removes companies for the path companies/:handle
    if(words[0] === "") words.shift();
    if(words.length > 1 ) words.shift();

    const formattedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return formattedWords.join(' ');
  };

export default formatHeading;