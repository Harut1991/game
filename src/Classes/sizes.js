export const sizes = (flask, ball, width, height) => {
    const defaultCount = 90;
    const defaultBall = 55;
    if (width/flask > 100){
        return {
            column: defaultCount,
            ball: defaultBall
        }
    } else {
        if (height -430 - defaultBall*ball*2 > 0 && flask*defaultCount+defaultCount+30 < width*2) {
            return {
                column: defaultCount,
                ball: defaultBall
            }
        } else {
            return {
                column: 70,
                ball: 40
            }
        }
    }
};
