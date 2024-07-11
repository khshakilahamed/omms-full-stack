exports.parseDate = (str) => {
      const [day, month, year] = str.split('-').map(Number);
      return new Date(year, month - 1, day); // Month is zero-based in Date constructor
}