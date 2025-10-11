export default function () {
  if ((globalThis as any)["@PROD"]) {
    //PROD
    const logo = `
_______________________________________________________________


 _     _  _     _____ _     _____ _      _____ _      _____ 
/ \   / \/ \ /\/  __// \   /  __// \__/|/  __// \  /|/__ __\
| |   | || | |||  \  | |   |  \  | |\/|||  \  | |\ ||  / \  
| |_/\| || \_/||  /_ | |_/\|  /_ | |  |||  /_ | | \||  | |  
\____/\_/\____/\____\\____/\____\\_/  \|\____\\_/  \|  \_/  
                                                            
                                           
________________________________________________________________
              author:xiaoyue
`;

    const rainbowGradient = `
background: linear-gradient(135deg, orange 60%, cyan);
background-clip: text;
color: transparent;
font-size: 16px; 
line-height: 1;
font-family: monospace;
font-weight: 600;
`;

    console.info(`%c${logo}`, rainbowGradient);
  } else if ((globalThis as any)["@DEV"]) {
    console.log("[EricUI]:dev mode...");
  }
}
