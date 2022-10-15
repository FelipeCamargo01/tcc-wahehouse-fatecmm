const Sequelize = require("sequelize");
const connection = require("../database/database");

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
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  },
  {
    freezeTableName: true,
  }
);

// User.sync({force: true});

const Supplier = connection.define(
  "suppliers",
  {
    id: {
      allowNull: false,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
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
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  },
  {
    freezeTableName: true,
  }
);

// Supplier.sync({force: true});

const Product = connection.define(
  "products",
  {
    id: {
      allowNull: false,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    SKU: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    price: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    supplierId: {
      type: Sequelize.UUID,
      references: { model: "suppliers", key: "id" },
      allowNull: false,
      onDelete: 'cascade'
    },
    productImage: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  },
  {
    freezeTableName: true,
  }
);

// Product.sync({force: true});

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
      type: Sequelize.UUID,
      references: { model: "products", key: "id" },
      allowNull: false,
      onDelete: 'cascade'
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
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  },
  {
    freezeTableName: true,
  }
);

// StockHistory.sync({force: true});

Supplier.hasMany(Product, {
  foreignKey: "supplierId",
  onDelete: "cascade",
  onUpdate: "cascade",
  hooks: true
});
Product.hasMany(StockHistory, {
  foreignKey: "productId",
  onDelete: "cascade",
  onUpdate: "cascade",
  hooks: true
});

Product.belongsTo(Supplier, { foreignKey: "supplierId" });
StockHistory.belongsTo(Product, { foreignKey: "productId" });

module.exports = {
  Product,
  Supplier,
  StockHistory,
  User,
};
