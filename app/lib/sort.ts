 function lexicalOrder(a: string, b: string): number {
  // Helper function to split string into prefix number and rest
  const splitPrefix = (str: string): [number | null, string] => {
    const match = str.match(/^(\d+)/);
    if (match) {
      return [parseInt(match[1], 10), str.slice(match[1].length, str.length - 4)]; // -4 for removing .txt from string for comparision
    }
    return [null, str.slice(0, str.length - 4)]; // -4 for removing .txt from string for comparision
  };

  const [prefixA, restA] = splitPrefix(a);
  const [prefixB, restB] = splitPrefix(b);

  // Compare prefixes
  if (prefixA !== null && prefixB !== null) {
    if (prefixA !== prefixB) {
      return prefixA - prefixB; // Normal numeric comparison in case of prefix
    }
    // If numeric values are the same, shorter original prefix comes first as with 001abc and 1abc
    const prefixANumber = a.match(/^\d+/);
    const prefixBNumber = b.match(/^\d+/);
    const originalPrefixA = prefixANumber? prefixANumber[0]: '';
    const originalPrefixB = prefixBNumber? prefixBNumber[0]: "";
    if (originalPrefixA.length !== originalPrefixB.length) {
      return originalPrefixA.length - originalPrefixB.length;
    } // In prefix Number is given priority over non-numeric prefix so 001abc or 20abc comes before abc but in suffix it's opposite 
  } else if (prefixA !== null) {
    return -1; // A has prefix, B doesn't
  } else if (prefixB !== null) {
    return 1;  // B has prefix, A doesn't
  }

  // If prefixes are the same or both null, compare the rest with number and string segments 

  const splitNumber = (str: string): string[] => { // get the string by splitting them with chunks of number i.e if a number is available in between then also we perform sorting
    return str.split(/(\d+)/).filter(Boolean);
  };

  const compareSegments = (segA: string, segB: string): number => {
    const numA = parseInt(segA);
    const numB = parseInt(segB);
    if (!isNaN(numA) && !isNaN(numB)) {
      return numA - numB;
    }
    return segA.localeCompare(segB);
  };

  const segmentsA = splitNumber(restA);
  const segmentsB = splitNumber(restB);

  for (let i = 0; i < Math.min(segmentsA.length, segmentsB.length); i++) {
    const comparison = compareSegments(segmentsA[i], segmentsB[i]);
    if (comparison !== 0) {
      return comparison;
    }
  }
  const lexicalCompare = restA.localeCompare(restB);
  if (lexicalCompare !== 0) {
    return lexicalCompare;
  }

  // If everything else is equal, shorter string comes first
  return a.length - b.length;
}

// Updated handleSort function
export default function handleSort(a: { date: Date; name: string }, b: { date: Date; name: string }): number {
  return lexicalOrder(a.name, b.name);
}

