export const getTimeByType = (type: number) => {
    switch (type) {
        case 1:
            return '1min';
        case 2:
            return '1 + 10s';
        case 3:
            return '2 + 10s';
        case 4:
            return '3min';
        case 5:
            return '3 + 2s';
        case 6:
            return '3 + 5s';
        case 7:
            return '3 + 10s';
        case 8:
            return '5min';
        case 9:
            return '5 + 2s';
        case 10:
            return '5 + 5s';
        case 11:
            return '5 + 10s';
        case 12:
            return '10min';
        case 13:
            return '10 + 10s';
        case 14:
            return '15min';
        case 15:
            return '15 + 10s';
        case 16:
            return '30 min ';
        default: return '';
    }
}