# Development notes for createthirdplaces.org

This repo contains a .vimrc file with some useful settings for Vim editing.
## Useful Vim notes for development

### Keyboard shortcuts
- hjkl: Move cursor
- 0: Move to beginning of line
- _: Move to first whitespace character
- $: Move to end of line
- Shift +A: Insert at end of line
- select -> >: Indent
- o: Append a new line below the current one and enter insert mode.
- O: Append a new line above the current one and center insert mode.
### Vim commands
- vimgrep: Search: Example to search in current directory: vim /word/ **/*
- cnext: Move to next match in search
- bd: Close search and return to file that was last open
- tabnew: Open new tab
- tabnext and :tabprevious: Update tab
- t + character: Move to next occurrence of character
- u: undo
- vsp: vertical window split

### Tmux commands
- tmux: Start tmux session
- tmux split-window -hf or -vf: Split tmux
- tmux kill-pane -t (number): Close tmux pane
- ctrl+b -> resize-pane (L,R,D,U): #cells: Resize tmux panel
- ctrl+b q -> Pane number: Show pane number and then switch to selected pane number
