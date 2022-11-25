const Sequelize = require("sequelize")
const connection = require("../database/database")

const User = connection.define(
  "users",
  {
    id: {
      allowNull: false,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    role: {
      allowNull: false,
      type: Sequelize.STRING,
    },
  },
  {
    freezeTableName: true,
  }
)

const Supplier = connection.define(
  "suppliers",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.literal("uuid_generate_v4()"),
      primaryKey: true,
    },
    address: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    cnpj: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    //razão social
    corporateName: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    //nome fantasia
    fantasyName: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    cep: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    addressNumber: {
      allowNull: false,
      type: Sequelize.STRING,
    },
  },
  {
    freezeTableName: true,
  }
)

const Product = connection.define(
  "products",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    //Código
    SKU: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    price: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    supplierId: {
      type: Sequelize.UUID,
      references: { model: "suppliers", key: "id" },
      allowNull: false,
      onDelete: "cascade",
    },
    productImage: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    //lote
    batchNumber: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
)

const StockHistory = connection.define(
  "stock-history",
  {
    id: {
      allowNull: false,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    productId: {
      type: Sequelize.STRING,
      references: { model: "products", key: "id" },
      onDelete: "cascade",
      allowNull: false,
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    actionDate: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  },
  {
    freezeTableName: true,
  }
)

const Tag = connection.define(
  "tags",
  {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    product_sku: {
      type: Sequelize.STRING,
      allowNull: false,
      references: { model: "products", key: "SKU" },
      onDelete: "cascade",
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
)

Supplier.hasMany(Product, {
  foreignKey: "supplierId",
  onDelete: "cascade",
  onUpdate: "cascade",
  hooks: true,
})

Product.hasMany(StockHistory, {
  foreignKey: "productId",
  onDelete: "cascade",
  onUpdate: "cascade",
  hooks: true,
})

Product.hasMany(Tag, {
  foreignKey: "product_sku",
  onDelete: "cascade",
  onUpdate: "cascade",
  hooks: true,
})

Product.belongsTo(Supplier, { foreignKey: "supplierId" })
StockHistory.belongsTo(Product, { foreignKey: "productId" })
Tag.belongsTo(Product, { foreignKey: "product_sku" })

module.exports = {
  Product,
  Supplier,
  StockHistory,
  User,
  Tag,
}
