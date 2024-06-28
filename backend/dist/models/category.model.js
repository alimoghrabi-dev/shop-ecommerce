import { Schema, model } from "mongoose";
const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
}, { timestamps: true });
const Category = model("Category", CategorySchema);
export default Category;
//# sourceMappingURL=category.model.js.map