const prisma = require("../utils/prisma.client")
async function paginate(modelName, filters, { pageNumber = 1, limit = 10, sortBy = "id", sortOrder = "asc" }, include = null) {
    const pageSize = limit;
    const skip = (pageNumber - 1) * pageSize;

    const totalCount = await prisma[modelName].count({
        where: filters,
    });

    const totalPages = Math.ceil(totalCount / pageSize);

    const items = await prisma[modelName].findMany({
        where: filters,
        skip: skip,
        take: pageSize,
        include: include,
        orderBy: {
            [sortBy]: sortOrder,
        },
    });

    return {
        items,
        pageNumber,
        pageSize,
        totalCount,
        totalPages,

    };
}
//   Here's how you can use this function:

// javascript
//   Copy code
// const paginationResult = await paginate("user", { role: "ADMIN" }, 2, 10, "name", "desc");
// console.log(paginationResult);
//   In the example above, we're calling the paginate function and passing the model name as the first argument ("user" in this case), followed by the filters object ({ role: "ADMIN" } in this case), the page number (2), and the limit (10).

//   The function calculates the skip value based on the page number and limit, and performs a count query to determine the total count of matching records.It then calculates the total number of pages based on the total count and the page size.

//     Finally, it performs the actual query using findMany and returns an object with the pagination details(pageNumber, pageSize, totalCount, totalPages) along with the paginated items(items).

//   You can customize the function further to include additional options or modify the behavior based on your specific requirements.

//     Note: Make sure to have the Prisma Client instance(prisma) available in the scope where you're using this function.


module.exports = { paginate }

