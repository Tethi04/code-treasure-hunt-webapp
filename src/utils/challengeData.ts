
export interface ChallengeData {
  id: number;
  title: string;
  description: string;
  codeSnippet: string;
  hint: string;
  solution: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const challenges: ChallengeData[] = [
  {
    id: 1,
    title: "The Hidden Variable",
    description: "Find the secret variable hiding in this code snippet. Look carefully at the pattern.",
    codeSnippet: `
function initialize() {
  let x = 10;
  let y = 20;
  // X marks the spot
  let _treasure_code_1 = "GOLD123";
  let z = 30;
  return x + y + z;
}
    `,
    hint: "Comments often contain clues. Search for a variable near the comment.",
    solution: "GOLD123",
    difficulty: "easy"
  },
  {
    id: 2,
    title: "Decode the Message",
    description: "This function contains a hidden message. Can you decode it?",
    codeSnippet: `
function processData(input) {
  const steps = [19, 9, 12, 22, 5, 18];
  let result = '';
  
  // decode me
  for (let i = 0; i < steps.length; i++) {
    result += String.fromCharCode(steps[i] + 97);
  }
  
  // _treasure_code_2 = result
  return input.length;
}
    `,
    hint: "The numbers might represent positions in the alphabet. Try converting them to letters.",
    solution: "silver",
    difficulty: "medium"
  },
  {
    id: 3,
    title: "The Recursive Maze",
    description: "Navigate through this recursive function to find the treasure code.",
    codeSnippet: `
function navigateMaze(path, depth = 0) {
  if (depth > 3) return null;
  
  if (path === 'left-right-left') {
    // You found it!
    return '_treasure_code_3 = "DIAMOND55"';
  }
  
  return {
    left: () => navigateMaze(path + '-left', depth + 1),
    right: () => navigateMaze(path + '-right', depth + 1),
    up: () => navigateMaze(path + '-up', depth + 1),
    down: () => navigateMaze(path + '-down', depth + 1)
  };
}
    `,
    hint: "You need to follow a specific sequence of directions. Look for clues in the termination condition.",
    solution: "DIAMOND55",
    difficulty: "hard"
  },
  {
    id: 4,
    title: "The Object Mystery",
    description: "There's a valuable key hidden in this object structure. Can you find it?",
    codeSnippet: `
const treasureMap = {
  beach: {
    north: "jungle",
    east: "cove",
    items: ["shovel", "bucket"]
  },
  jungle: {
    south: "beach",
    west: "mountain",
    items: ["vine", "banana"]
  },
  mountain: {
    east: "jungle",
    secret: {
      tunnel: {
        leads_to: "cove",
        requires: "torch",
        chest: {
          locked: true,
          _treasure_code_4: "EMERALD42"
        }
      }
    }
  },
  cove: {
    west: "beach",
    items: ["torch", "seashell"]
  }
};
    `,
    hint: "You need to dig deep into nested objects. The mountain might have secrets.",
    solution: "EMERALD42",
    difficulty: "medium"
  },
  {
    id: 5,
    title: "The Final Cipher",
    description: "This is the final challenge. Decrypt the cipher to obtain the master treasure code.",
    codeSnippet: `
// The Final Cipher
function encrypt(text, shift) {
  return text.split('').map(char => {
    if (char.match(/[a-z]/i)) {
      const code = char.charCodeAt(0);
      const isUpperCase = code >= 65 && code <= 90;
      const offset = isUpperCase ? 65 : 97;
      
      // Shift and wrap around the alphabet
      return String.fromCharCode(
        ((code - offset + shift) % 26) + offset
      );
    }
    return char;
  }).join('');
}

// Master code is encrypted
const masterCode = "GEVCTROIEVI";
// Shift value is the product of the first two digits in each previous treasure code
// _treasure_code_5 = decrypt(masterCode, ?)
    `,
    hint: "You need to decrypt the message by using 'encrypt' with a negative shift. The shift value is a clue based on previous codes.",
    solution: "MASTERCHEST",
    difficulty: "hard"
  }
];
