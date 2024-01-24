import { writable } from 'svelte/store';

export const overlayStatus = writable(false);
export const overlayContent = writable("");
export const activeMenuItem = writable(""); // Nieuw toegevoegd
