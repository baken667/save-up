import _ from "lodash";

function getRandomFactor(minPercentage: number = 5, maxPercentage: number = 20) {
    const min = minPercentage / 100
    const max = maxPercentage / 100
    const factor = Math.random() * (max - min) + min
    const sign = Math.random() < 0.5 ? -1 : 1;

    return factor * sign
}

function GenerateSavingPlan(
    totalAmount: number,
    denominations: number[],
    minPerDay?: number,
    maxPerDay?: number,
    totalDays: number | null = null
) {
    denominations = _.sortBy(denominations, (a) => -a)
    const minPart = minPerDay ?? _.min(denominations) as number
    const maxPart = maxPerDay ?? totalAmount

    const savingPlan = []

    if (!totalDays) {
        totalDays = Math.ceil(totalAmount / minPart)
    }

    let remainingAmount = totalAmount;

    for (let day = 1; day <= totalDays; day++) {
        const avgAmount = remainingAmount / (totalDays - day + 1)
        const randomFactor = getRandomFactor()
        const targetAmount = avgAmount * (1 + randomFactor)
        const amountForDay = Math.min(Math.max(minPart, targetAmount), maxPart)
        let adjustedAmount = 0

        for (const denom of denominations) {
            while (adjustedAmount + denom <= amountForDay) {
                adjustedAmount += denom
            }
        }

        adjustedAmount = _.round(adjustedAmount, 2);

        savingPlan.push({
            day: day,
            amount: adjustedAmount
        })

        remainingAmount -= adjustedAmount;
    }

    if (remainingAmount > 0) {
        const lastDay = savingPlan[savingPlan.length - 1];
        lastDay.amount += remainingAmount;
        lastDay.amount = _.round(lastDay.amount, 2);
    }

    return savingPlan;
}

export default GenerateSavingPlan