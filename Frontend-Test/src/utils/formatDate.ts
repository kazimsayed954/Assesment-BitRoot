export const formatDate = (timestamp: number) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(timestamp * 1000).toLocaleDateString(undefined, options);
  };