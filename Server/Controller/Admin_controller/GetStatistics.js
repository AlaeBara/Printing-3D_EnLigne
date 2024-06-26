const { Commandes } = require("../../BD/Commandes");
const { Message } = require("../../BD/Messages");

const GetStatistics = async (req, res) => {
    try {
        // Total price of all orders
        const totalOrdersPriceResult = await Commandes.aggregate([
            { $group: { _id: null, totalPrice: { $sum: "$price" } } }
        ]);
        const totalOrdersPrice = totalOrdersPriceResult.length > 0 ? totalOrdersPriceResult[0].totalPrice : 0;

        // Total price of completed orders
        const finDeImpressionPriceSumResult = await Commandes.aggregate([
            { $match: { printerStatus: "fin de d'impression" } },
            { $group: { _id: null, totalPrice: { $sum: "$price" } } }
        ]);
        const finDeImpressionPriceSum = finDeImpressionPriceSumResult.length > 0 ? finDeImpressionPriceSumResult[0].totalPrice : 0;

        // Printer status counts
        const prêtCount = await Commandes.countDocuments({ printerStatus: "Prêt" });
        const enCoursCount = await Commandes.countDocuments({ printerStatus: "En cours d'impression" });
        const finDeImpressionCount = await Commandes.countDocuments({ printerStatus: "fin de d'impression" });

        // Message count
        const messageCount = await Message.countDocuments();

        // Average time difference between date and date_résiliation
        const averageTimeDifferenceResult = await Commandes.aggregate([
            {
                $match: {
                    date: { $exists: true },
                    date_résiliation: { $exists: true }
                }
            },
            {
                $project: {
                    difference: {
                        $subtract: [
                            { $toDate: "$date_résiliation" },
                            { $toDate: "$date" }
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    averageDifference: { $avg: "$difference" }
                }
            }
        ]);
        const averageTimeDifference = averageTimeDifferenceResult.length > 0 ? averageTimeDifferenceResult[0].averageDifference : 0;

        // Respond with the aggregated statistics
        return res.status(200).json({
            printerStatusCounts: {
                prêt: prêtCount,
                enCours: enCoursCount,
                finDeImpression: finDeImpressionCount
            },
            finDeImpressionPriceSum: finDeImpressionPriceSum,
            messageCount: messageCount,
            totalOrdersPrice: totalOrdersPrice,
            averageTimeDifference: averageTimeDifference
        });
    } catch (error) {
        console.error("Error occurred:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { GetStatistics };
