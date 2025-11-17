/**
 * Extracts initials from a full name.
 * 
 * For names with multiple parts (e.g. "John Doe"), it returns the first letter
 * of the first name and the first letter of the last name (e.g. "JD").
 * For single names (e.g. "John"), it returns the first letter (e.g. "J").
 * 
 * @param fullName - The full name to extract initials from
 * @returns A string containing the initials, or an empty string if no name is provided
 * 
 * @example
 * getInitials("John Doe") // returns "JD"
 * getInitials("Bob") // returns "B"
 * getInitials("") // returns ""
 * getInitials(null) // returns ""
 */
export const getInitials = (fullName: null | string | undefined): string => {
  if (!fullName) return '';
  
  const names = fullName.trim().split(/\s+/);
  if (names.length === 0) return '';
  
  if (names.length === 1) {
    return names[0].charAt(0).toUpperCase();
  }
  
  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
};

// Export as default as well for convenience
export default getInitials;