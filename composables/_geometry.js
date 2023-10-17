export const definePointCoordinate = (pole, polarAxis, originX = 0, originY = 0, pointRadius = 0) => {
    return {
        x: originX + (pole * Math.cos(polarAxis/57.3).toFixed(1)) - pointRadius, 
        y: originY + (pole * Math.sin(polarAxis/57.3).toFixed(1)) - pointRadius
    }
}

export const definePointsForCircle = (quantity, circleRadius, pointRadius) => {
    const polarAxisStep = 360/quantity
    const points = new Map()
    for(let i = 1; i<=quantity; i++) {
        points.set(i, definePointCoordinate(circleRadius, polarAxisStep*i, circleRadius, circleRadius, pointRadius))
    }
    return points
}