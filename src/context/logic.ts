import { blueList, goldenList, violetList } from './list'

export const currentCard = {
	// 品质
	quantity: undefined as any,
	// 物品
	item: undefined as any,
}

export const globalLogic = {
	probability_golden: 0.6, //金卡基础概率
	probability_violet: 5.1, //紫卡基础概率
	totoalCount: 0, //总抽卡次数
	accNoGoldenCount: 0, //不出金次数
	accNoVioletCount: 0, //不出紫次数
	awardColor: 'blue', //出啥颜色卡
}
// 抽中金卡，重新初始化
export function initAwardedGolden() {
	globalLogic.probability_golden = 0.6
	globalLogic.accNoGoldenCount = 0
	globalLogic.awardColor = 'golden'
}
// 抽中紫卡，重新初始化
function initAwardedViolet() {
	globalLogic.probability_violet = 5.1
	globalLogic.accNoVioletCount = 0
	globalLogic.awardColor = 'violet'
}
export function computeProOne() {
	globalLogic.totoalCount++
	const randomGolden = Number(
		(Math.random() * 100).toFixed(2)
	)
	const randomNumViolet = Number(
		(Math.random() * 100).toFixed(2)
	)
	//是否出金 出金大保低
	if (globalLogic.accNoGoldenCount >= 90) {
		console.log(
			'出金啦/大保低：',
			globalLogic.probability_golden,
			'~' + randomGolden + ' 抽卡次数：',
			globalLogic.totoalCount
		)
		globalLogic.awardColor = 'gold'
		currentCard.quantity = 'gold'
		currentCard.item =
			goldenList[
				Math.floor(Math.random() * goldenList.length)
			]
		initAwardedGolden()
		return {
			currentCard: { ...currentCard },
			currentCount: globalLogic.accNoGoldenCount,
		}
	}
	//是否出金 出金小保低
	if (globalLogic.accNoGoldenCount >= 73) {
		if (globalLogic.probability_golden >= randomGolden) {
			globalLogic.awardColor = 'gold'
			currentCard.quantity = 'gold'
			currentCard.item =
				goldenList[
					Math.floor(Math.random() * goldenList.length)
				]

			console.log(
				'出金啦/小保低：',
				currentCard,
				'------抽卡次数',
				globalLogic.totoalCount
			)
			initAwardedGolden()
			return {
				currentCard: { ...currentCard },
				currentCount: globalLogic.accNoGoldenCount,
			}
		} else {
			globalLogic.probability_golden += 6
		}
	}
	//是否出金  出金小欧皇
	if (globalLogic.accNoGoldenCount <= 73) {
		if (globalLogic.probability_golden >= randomGolden) {
			globalLogic.awardColor = 'gold'
			currentCard.quantity = 'gold'
			currentCard.item =
				goldenList[
					Math.floor(Math.random() * goldenList.length)
				]

			console.log(
				'出金',
				currentCard,
				'------抽卡次数',
				globalLogic.totoalCount
			)

			// console.log(
			// 	'出金啦/欧皇：',
			// 	globalLogic.probability_golden,
			// 	'~' + randomGolden + ' 抽卡次数：',
			// 	globalLogic.totoalCount
			// )
			initAwardedGolden()

			return {
				currentCard: { ...currentCard },
				currentCount: globalLogic.accNoGoldenCount,
			}
		}
	}
	//是否出紫
	if (globalLogic.probability_violet >= randomNumViolet) {
		globalLogic.awardColor = 'violet'
		currentCard.quantity = 'violet'
		currentCard.item =
			violetList[
				Math.floor(Math.random() * violetList.length)
			]

		console.log(
			'出紫/欧皇：',
			currentCard,
			'--------抽卡次数：',
			globalLogic.totoalCount
		)

		// console.log(
		// 	'出紫/欧皇：',
		// 	globalLogic.probability_violet,
		// 	'~' + randomNumViolet + ' 抽卡次数：',
		// 	globalLogic.totoalCount
		// )
		initAwardedViolet()
	} else {
		globalLogic.accNoVioletCount++
		if (globalLogic.accNoVioletCount == 8) {
			globalLogic.probability_violet += 51
		}
		if (globalLogic.accNoVioletCount == 9) {
			globalLogic.probability_violet = 100
		}
		// 出蓝
		globalLogic.awardColor = 'blue'
		currentCard.quantity = 'blue'
		currentCard.item =
			blueList[Math.floor(Math.random() * blueList.length)]

		console.log(
			'出蓝',
			currentCard,
			'------抽卡次数',
			globalLogic.totoalCount
		)
	}
	globalLogic.accNoGoldenCount++

	return {
		currentCard: { ...currentCard },
		currentCount: globalLogic.accNoGoldenCount,
	}
}
export function computeProTen() {
	for (let i = 0; i < 10; i++) {
		computeProOne()
	}
}
