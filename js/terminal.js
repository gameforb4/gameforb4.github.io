const terminalWindow = document.querySelector('.terminal-window');
const terminalHeader = document.querySelector('.terminal-header');

const closeButton = document.querySelector('.close-button');
closeButton.addEventListener('click', hideTerminal);

function showTerminal() {
    const hide = document.getElementById('terminal-hide');
    hide.style.visibility = 'visible';
}
function hideTerminal() {
    const hide = document.getElementById('terminal-hide');
    hide.style.visibility = 'hidden';
}

let isDragging = false;
let offsetX = 0;
let offsetY = 0;

terminalHeader.addEventListener('mousedown', (e) => {
    isDragging = true;
    const rect = terminalWindow.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    terminalHeader.style.cursor = 'grabbing';
    document.body.style.userSelect = 'none';
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        terminalWindow.style.left = `${e.clientX - offsetX}px`;
        terminalWindow.style.top = `${e.clientY - offsetY}px`;
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    terminalHeader.style.cursor = 'grab';
    document.body.style.userSelect = '';
});









function doDate()
{
    var str = "";
    var months = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
    var now = new Date();
    str += now.getDate() + " " + months[now.getMonth()] + " " + now.getFullYear() + " " + now.getHours() +":" + now.getMinutes() + ":" + now.getSeconds();
    document.getElementById("date").innerHTML = str;
}

setInterval(doDate, 1000);




let fileSystem = {
    '/': {
      type: 'directory',
      contents: {
        home: {
          type: 'directory',
          contents: {
            'readme.txt': {
              type: 'file',
              content: `Welcome Basoumti.

Internal services were moved to:
intranet.local

Type 'help' if you need assistance.`
            },
            'key.enc': {
              type: 'file',
              content: `BVFK`
            }
          }
        }
      }
    }
  };

let currentPath = ['/']; // root
let whoamiCount = 0;



function storeFileSystem() {
    try {
        localStorage.setItem('slashFileSystem', JSON.stringify(fileSystem));
        printToTerminal('File system stored successfully.');
    } catch (e) {
        printToTerminal('Error storing file system: ' + e.message);
    }
}

function loadFileSystem() {
    try {
        const data = localStorage.getItem('slashFileSystem');
        if (data) {
            fileSystem = JSON.parse(data);
            printToTerminal('File system loaded from local storage.');
        } else {
            printToTerminal('No file system found in local storage.');
        }
    } catch (e) {
        printToTerminal('Error loading file system: ' + e.message);
    }
}

function clearFileSystem() {
    localStorage.removeItem('slashFileSystem');
    printToTerminal('File system removed from local storage.');
}


const inputField = document.getElementById('terminal-input');
  const terminalOutput = document.getElementById('terminal-output');

  inputField.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      const command = inputField.value.trim();
      if (command !== "") {
        const line = document.createElement('div');
        line.className = 'command-line';
        const currentDirDisplay = currentPath.join('/');
        line.textContent = `b4soum@pc212:${currentDirDisplay}$ ${command}`;
        terminalOutput.appendChild(line);
        processInput(command);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
      }
      inputField.value = "";
    }
  });


function processInput(input) {
    if (input === "help") {
        terminalHelp();
    } else if (input === 'storefs') {
        storeFileSystem();
    } else if (input === 'loadfs') {
        loadFileSystem();
    } else if (input === 'clearfs') {
        clearFileSystem()
    } else if (input === "clear") {
        clear();
        return;
    } else if (input === 'list') {
        lsCommand();
    } else if (input.startsWith('go ')) {
        const arg = input.split(' ')[1];
        cdCommand(arg);
    } else if (input.startsWith('ping')) {
        const arg = input.split(' ')[1];
        ping(arg);
    } else if (input.startsWith('touch ')) {
        const arg = input.split(' ')[1];
        touchCommand(arg);
    } else if (input.startsWith('mkdir ')) {
        const arg = input.split(' ')[1];
        mkdirCommand(arg);
    } else if (input.startsWith('echo ')) {
        echoCommand(input);
    } else if (input.startsWith('read ')) {
        const arg = input.split(' ')[1];
        catCommand(arg);
    } else if (input.startsWith('su')) {
        printToTerminal('Cannot switch user - No permission!')
    } else if (input.startsWith('rm ')) {
        const arg = input.split(' ')[1];
        rmCommand(arg);
    } else if (input === 'pwd') {
        pwdCommand();
    } else if (input === 'whoami') {
        whoamiCommand();
    } else if (input.startsWith('finger')) {
        const arg = input.split(' ')[1];
        finger(arg)
    } else if (input.startsWith('decrypt ')) {
        const arg = input.split(' ')[1];
        decryptFile(arg);
    } else if (input === 'date') {
        dateCommand();
    } else if (input === 'browser') {
        openBrowser();
    } else if (input.startsWith("editor ")) {
        const path = input.slice(7).trim();
        const pathArray = path.split('/').filter(p => p);
        openTextEditor(['/', ...pathArray]);
        return;
    } else if (input === 'editor') {
        printToTerminal("editor command usage: editor filepath");
    } else if (input.startsWith('shutdown')) {
        shutdownCommand();
    } else if (input === 'ipconfig') {
        printToTerminal(`---Network configuration---

            2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
            inet 192.168.1.10/24 brd 192.168.1.255 scope global dynamic eth0
            valid_lft 86010sec preferred_lft 86010sec

            lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
                inet 127.0.0.1  netmask 255.0.0.0
                inet6 ::1  prefixlen 128  scopeid 0x10<host>
                loop  txqueuelen 1000  (Local Loopback)
                RX packets 16  bytes 1915 (1.9 KB)
                RX errors 0  dropped 0  overruns 0  frame 0
                TX packets 16  bytes 1915 (1.9 KB)
                TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
            `)
    } else if (input === 'slashfetch') {
        slashFetchCommand();
    } else if (input === "slash complete@level1") {
        window.location.href = "level2.html";
    } else if (input === "slash complete@Basma") {
        window.location.href = "completed.html";
    } else if (input.startsWith('download ')) {
        const parts = input.split(' ');
        const url = parts[1];
        const output = parts[3];
        
        if (url === 'b4soum.site/secret.txt' && output === 'secret.txt') {
            const dir = getCurrentDir();
            dir.contents['secret.txt'] = {
            type: 'file',
            content: `Goodjob, My beautiful princess
            Type this command in the terminal to continue:
            slash complete@level1`
            };
            printToTerminal('File downloaded: secret.txt');
        } else {
            printToTerminal('download: failed to download file');
        }

    } else if (input.startsWith("run ")) {
        const arg = input.slice(4).trim();
        runSlashFile(arg);
    } else if (input === 'exit') {
        clear();
        hideTerminal();
        printToTerminal(`Slash version 2.1.234 (Stable)
        Type <code>help</code> for a list of possible commands.`)
    } else if (input === 'slash fix_pc') {
        // Check if file exists
        const file = getCurrentDir().contents['fix_pc.slash'];
        if (!file) {
            printToTerminal('Error: fix_pc.slash not found');
            return;
        }
        
        // Check if still contains the bug
        if (file.content.includes('// 🐞 MISSING )')) {
            printToTerminal('Error: File still corrupted! Fix the syntax first');
            return;
        }
        
        // Restore system
        printToTerminal('Executing system repair...');
        setTimeout(() => {
            printToTerminal('Restoring files...');
            
            // Create the final message
            fileSystem['/'].contents['message_from_husband.txt'] = {
                type: 'file',
                content: `Happy birthday, My pretty girl❤️
                Type this command in the terminal:
                slash complete@Basma`
            };
            
            // Restore UI
            document.body.classList.remove('hacked-mode');
            document.querySelectorAll('.taskbar .icon').forEach(icon => {
                icon.style.opacity = '1';
            });
            
            printToTerminal('✅ System restored! Check your files.');
            window.matrixEffect.stopMatrix();
        }, 2000);
    } else {
        printToTerminal(`Wrong command: ${input}`);
    }
}




function getFileFromPath(path) {
    const parts = path.split('/').filter(Boolean);
    let node = fileSystem['/'];
    
    for (const part of parts) {
      if (node.type === 'directory' && node.contents[part]) {
        node = node.contents[part];
      } else {
        return null;
      }
    }
    return node;
}



function printToTerminal(text) {
    const terminalOutput = document.getElementById('terminal-output');
    const line = document.createElement('div');
    line.className = 'command-line';
    line.innerHTML = text.replace(/\n/g, '<br>'); // Replace \n with <br>
    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}





function decryptFile(fileName) {
    const file = getCurrentDir().contents[fileName];
    if (!file || file.type !== 'file') {
      printToTerminal(`decrypt: file '${fileName}' not found`);
      return;
    }
  
    // Get the 4 answers she provided earlier (from your message app)
    const answer1 = "Breeze"; // Replace with variable from message app
    const answer2 = "Vandal";    // Replace with variable from message app
    const answer3 = "FY4JXBBQPAXCJH"; // Replace with variable from message app
    const answer4 = "Kajo"; // Replace with variable from message app
    const correctKey = `${answer1}-${answer2}-${answer3}-${answer4}`;

    const userKey = prompt(`Enter decryption key (combine your 4 answers with hyphens):`);
    
    if (userKey === correctKey) {
        try {
            // This would be your base64-encoded website credentials
            const decoded = atob("dXNlcm5hbWU6IGI0c291bXRpaQpwYXNzd29yZDogbXlwcjFuY2VzczY=");

            setTimeout(() => {
                printToTerminal(``);
            }, 1000);
            setTimeout(() => {
                printToTerminal(`Processing Memory 1/3...`);
            }, 1300);
            setTimeout(() => {
                printToTerminal(`Processing Memory 2/3...`);
            }, 2000);
            setTimeout(() => {
                printToTerminal(`Processing Memory 3/3...`);
            }, 2500);
            setTimeout(() => {
                printToTerminal(`Generating output...`);
            }, 3500);
            setTimeout(() => {
                printToTerminal(`Decryption successful! :\n\n"${decoded}"\n\ Go to 'b4soum.site' in browser and log in.`);
            }, 4900);
        }
        catch (error) {
            printToTerminal(`decrypt: Failed to decrypt the file. ${error}`)
            return;
        }
    }
    else {
        setTimeout(() => {
            printToTerminal(`Applying key "${userKey}"...`);
        }, 500);
        setTimeout(() => {
            printToTerminal("decrypt: Wrong key. Wow so you dont love me?");
        }, 1000);
    }
}
  

function finger(user) {
    if (user === 'b4soum') {
        printToTerminal(`Login: ${user}
            Name: ${user}
            Directory: /home/
            Shell: /slash/
            
            No mail.
            No plan.
            No escape.`);
    }
    else {
        printToTerminal(`finger: No such user.`);
    }
}

function ping(ip) {
    if (checkIPType(ip) === 'valid') {
        printToTerminal(`Pinging IP ${ip} with 32 bytes of data:`);
        setTimeout(() => {
            printToTerminal(`Reply from ${ip}: bytes=32 time<1ms TTL=128`);
        }, 500);
        setTimeout(() => {
            printToTerminal(`Reply from ${ip}: bytes=32 time<1ms TTL=128`);
        }, 1000);
        setTimeout(() => {
            printToTerminal(`Reply from ${ip}: bytes=32 time<1ms TTL=128`);
        }, 1500);
        setTimeout(() => {
            printToTerminal(`Reply from ${ip}: bytes=32 time<1ms TTL=128`);
        }, 2000);
        setTimeout(() => {
            printToTerminal(`Ping statistics for 192.168.0.122:
                Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
                Approximate round trip times in milli-seconds:
                Minimum = 0ms, Maximum = 0ms, Average = 0ms`);
        }, 3000);
    }
    else if (checkIPType(ip) === 'online') {
        printToTerminal(`Pinging IP ${ip} with 32 bytes of data:`);
        setTimeout(() => {
            printToTerminal(`Reply from ${ip}: Destination host unreachable.`);
        }, 1000);
        setTimeout(() => {
            printToTerminal(`Reply from ${ip}: Destination host unreachable.`);
        }, 1500);
        setTimeout(() => {
            printToTerminal(`Reply from ${ip}: Destination host unreachable.`);
        }, 2000);
        setTimeout(() => {
            printToTerminal(`Reply from ${ip}: Destination host unreachable.`);
        }, 2500);
        setTimeout(() => {
            printToTerminal(`Ping statistics for 192.168.0.122:
                Packets: Sent = 4, Received = 4, Lost = 0 (0% loss)`);
        }, 3500);
    }
    else {
        printToTerminal(`ping: Ping request could not find host ${ip}. Please check the name and try again.`);
    }
}


function checkIPType(ip) {
    const regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    
    if (!regex.test(ip)) {
      return 'invalid';
    }

    const octets = ip.split('.').map(Number);
  
    // Class A: 10.0.0.0 - 10.255.255.255
    if (octets[0] === 10) {
      return 'valid';
    }
  
    // Class B: 172.16.0.0 - 172.31.255.255
    if (octets[0] === 172 && octets[1] >= 16 && octets[1] <= 31) {
      return 'valid';
    }
  
    // Class C: 192.168.0.0 - 192.168.255.255
    if (octets[0] === 192 && octets[1] === 168) {
      return 'valid';
    }
  
    return 'online';
}


function pwdCommand() {
    const path = currentPath.join('/');
    printToTerminal(path === '' ? '/' : path);
}

function whoamiCommand() {
    if (whoamiCount < 3) {
        printToTerminal('b4soum');
        whoamiCount ++;
    }
    else {
        printToTerminal('Do we all even really know who we are?');
        whoamiCount = 0;
    }
}

function dateCommand() {
    const now = new Date();
    printToTerminal(now.toString());
}

function catCommand(fileName) {
    const dir = getCurrentDir();
    const file = dir.contents[fileName];

    if (file && file.type === 'file') {
        printToTerminal(file.content || '');
    } else if (file && file.type === 'directory') {
        printToTerminal(`read: ${fileName}: Is a directory`);
    } else {
        printToTerminal(`read: ${fileName}: No such file`);
    }
}


function rmCommand(name) {
    const dir = getCurrentDir();
    const item = dir.contents[name];

    if (!item) {
        printToTerminal(`rm: cannot remove '${name}': No such file or directory`);
    } else if (item.type === 'directory') {
        printToTerminal(`rm: cannot remove '${name}': Is a directory`);
    } else {
        delete dir.contents[name];
    }
}



function mkdirCommand(dirName) {
    const dir = getCurrentDir();
    if (!dir.contents[dirName]) {
        dir.contents[dirName] = {
            type: 'directory',
            contents: {}
        };
    } else {
        printToTerminal(`mkdir: cannot create directory '${dirName}': File exists`);
    }
}


function echoCommand(input) {
    const match = input.match(/^echo\s+(.+?)(?:\s*>\s*(\S+))?$/);
    if (!match) {
        printToTerminal('echo: invalid syntax');
        return;
    }

    const message = match[1];
    const fileName = match[2];

    if (fileName) {
        const dir = getCurrentDir();
        dir.contents[fileName] = {
            type: 'file',
            content: message
        };
    } else {
        printToTerminal(message);
    }
}






function terminalHelp() {
    printToTerminal(`--- HELP ---
        help                &gt; Shows a list of possible commands
        clear               &gt; Clears the terminal
        list                  &gt; Lists files and folders in current directory
        go (folder)             &gt; Goes to directory
        read  (file)          &gt; Views contents of a file
        download -o -url -file  &gt; Downloads a file from a URL
        pwd                 &gt; Prints current directory
        whoami              &gt; Prints current user
        decrypt             &gt; Decrypt a file using a key
        exit                &gt; Exits the terminal
        shutdown            &gt; Shuts down the system
        `);
}


function clear() {
    const terminalOutput = document.getElementById('terminal-output');
    terminalOutput.innerHTML = "";
}

function getCurrentDir() {
    let dir = fileSystem['/'];
    for (let i = 1; i < currentPath.length; i++) {
        dir = dir.contents[currentPath[i]];
    }
    return dir;
}

function lsCommand() {
    const dir = getCurrentDir();
    const entries = Object.keys(dir.contents).join('  ');
    printToTerminal(entries || '(empty)');
}

function cdCommand(dirName) {
    if (dirName === '..') {
        if (currentPath.length > 1) currentPath.pop();
        return;
    }

    const dir = getCurrentDir();
    if (dir.contents[dirName] && dir.contents[dirName].type === 'directory') {
        currentPath.push(dirName);
    } else {
        printToTerminal(`go: no such directory: ${dirName}`);
    }
}

function touchCommand(fileName) {
    const dir = getCurrentDir();
    if (!dir.contents[fileName]) {
        dir.contents[fileName] = {
        type: 'file',
        content: ''
        };
    } else {
        printToTerminal(`touch: file '${fileName}' already exists`);
    }
}

function openBrowser() {
    const browser = document.getElementById('browser');
    browser.classList.remove('hidden');
    printToTerminal('Opening browser...');
}

function slashFetchCommand() {
    printToTerminal(`
b4osum@pc212   
-------------
Have fun playing honeyy!

`);
}

function shutdownCommand() {
    printToTerminal("Logout")
    setTimeout(() => {
        goToStart()
    }, 1000);
}








// Scripting logic (new)

function runSlashFile(path) {
    const pathArray = path.split('/').filter(p => p);
    const fullPath = ['/', ...pathArray];

    let ref = fileSystem['/'];
    for (let i = 1; i < fullPath.length - 1; i++) {
        if (ref.type === 'directory' && ref.contents[fullPath[i]]) {
            ref = ref.contents[fullPath[i]];
        } else {
            printToTerminal('Invalid path to .slash file.');
            return;
        }
    }

    const filename = fullPath[fullPath.length - 1];
    const file = ref.contents[filename];

    if (!file || file.type !== 'file') {
        printToTerminal('Invalid .slash file.');
        return;
    }

    const lines = file.content.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    printToTerminal(`Running ${filename}...`);

    const slashVariables = {};
    const functions = {};
    let i = 0;

    // First pass: collect all functions
    while (i < lines.length) {
        if (lines[i].startsWith('function ')) {
            const funcName = lines[i].split(' ')[1];
            const funcBody = [];
            i++;

            while (i < lines.length && lines[i] !== 'endfunc') {
                funcBody.push(lines[i]);
                i++;
            }

            if (i >= lines.length || lines[i] !== 'endfunc') {
                printToTerminal(`Syntax error: Missing 'endfunc' for function '${funcName}'.`);
                return;
            }

            functions[funcName] = funcBody;
        }
        i++;
    }

    // Second pass: run script
    i = 0;
    while (i < lines.length) {
        let line = lines[i].split('#')[0].trim(); // Skip comments (# Comment)
        if (line.length === 0) {
            i++;
            continue;
        }

        if (line.startsWith('function ')) {
            while (i < lines.length && lines[i] !== 'endfunc') {
                i++;
            }
            i++; // skip endfunc
            continue;
        }

        if (functions[line]) {
            const funcLines = functions[line];
            for (let cmd of funcLines) {
                const replacedCmd = replaceVariables(cmd, slashVariables);
                processInput(replacedCmd);
            }
            i++;
            continue;
        }

        if (line.startsWith('set ')) {
            const parts = line.slice(4).split('=');
            if (parts.length !== 2) { // if this happens, the variable is not declared right
                printToTerminal(`Syntax error: Invalid variable declaration '${line}'`);
                return;
            }
            const key = parts[0].trim();
            const value = parts[1].trim();
            slashVariables[key] = value;
            i++;
            continue;
        }

        if (line.startsWith('if ')) {
            const conditionRaw = line.slice(3).trim();
            const cleanedCondition = conditionRaw.replace(/^\[|\]$/g, '').trim(); // Debugging: Bug #003
            const condition = replaceVariables(cleanedCondition, slashVariables);
            const isTrue = evaluateCondition(condition);


            const trueBlock = [];
            const falseBlock = [];
            let inElse = false;
            i++;

            let foundEndif = false;
            while (i < lines.length) {
                if (lines[i] === 'endif') {
                    foundEndif = true;
                    break;
                }
                if (lines[i] === 'else') {
                    if (inElse) {
                        printToTerminal(`Syntax error: Multiple 'else' blocks.`);
                        return;
                    }
                    inElse = true;
                } else {
                    const cmd = replaceVariables(lines[i], slashVariables);
                    (inElse ? falseBlock : trueBlock).push(cmd);
                }
                i++;
            }

            if (!foundEndif) {
                printToTerminal(`Syntax error: Missing 'endif' for if block.`);
                return;
            }

            const blockToRun = isTrue ? trueBlock : falseBlock;
            for (let cmd of blockToRun) {
                processInput(cmd);
            }

            i++; // Skip 'endif'
            continue;
        }

        if (line.startsWith('for ')) {
            const forParts = line.split(' ');
            if (forParts.length < 4 || forParts[2] !== 'in') {
                printToTerminal(`Syntax error: Invalid for loop syntax.`);
                return;
            }

            const loopVar = forParts[1];
            const values = forParts.slice(3);

            const loopBlock = [];
            i++;

            let foundEndfor = false;
            while (i < lines.length) {
                if (lines[i] === 'endfor') {
                    foundEndfor = true;
                    break;
                }
                loopBlock.push(lines[i]);
                i++;
            }

            if (!foundEndfor) {
                printToTerminal(`Syntax error: Missing 'endfor' for loop.`);
                return;
            }

            for (let val of values) {
                slashVariables[loopVar] = val;
                for (let cmd of loopBlock) {
                    const replacedCmd = replaceVariables(cmd, slashVariables);
                    processInput(replacedCmd);
                }
            }

            i++; // skip endfor
            continue;
        }

        // Default
        line = replaceVariables(line, slashVariables);
        processInput(line);
        i++;
    }
}

function evaluateCondition(condition) {
    // Remove brackets and trim
    condition = condition.replace(/^\[|\]$/g, '').trim();

    const [left, operator, right] = condition.split(' ');

    switch (operator) {
        case '==': return left === right;
        case '!=': return left !== right;
        case '>': return parseFloat(left) > parseFloat(right);
        case '<': return parseFloat(left) < parseFloat(right);
        default: return false;
    }
}

function replaceVariables(line, variables) {
    return line.replace(/\$[a-zA-Z_][a-zA-Z0-9_]*/g, match => {
        const varName = match.slice(1);
        return variables[varName] !== undefined ? variables[varName] : match;
    });
}

