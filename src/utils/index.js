import {
    COLORS,
} from "../constants";

export function nameToInitials(name, init_no){
    if(typeof name !== 'string' || name.length < 1) return '';

    let m = /\s+/g.exec(name);
    let pat = m ? /\s+/g : '';

    let split_names = [];

    if(init_no)
        split_names = name.split(pat, init_no);
    else
        split_names = name.split(pat);

    let initName = '';
    split_names.forEach(s => initName += s[0]);
    return initName.toUpperCase();
}

export function getRandomColor(){
    let colKeys = Object.keys(COLORS);
    let colLent = colKeys.length;
    let kindx = Math.floor(Math.random() * colLent);
    let color_key = colKeys[kindx];
    return [color_key, COLORS[color_key]];
}