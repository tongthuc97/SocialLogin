
export class ChartMax {
    static default: number = 80;

    static getMax(length) {
        let result = this.default / length;
        return Math.round(result*100)/100;
    }
}