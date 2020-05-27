module.exports = app => {
    const Stat = app.mongoose.model('Stat', {
        users: Number,
        categories: Number,
        articles: Number,
        createAt: Date
    })

    const get = async (req, res) => {
        Stat.findOne({}, {}, { sort: { createAt: -1 } })
            .then(stat => {
                defaultStat = {
                    users: 0,
                    categories: 0,
                    articles: 0,
                }
                res.status(200).json(stat || defaultStat)
            })
    }
    return { Stat, get }
}