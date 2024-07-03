import { CreateProduct, EditUser, RegisteredUser } from "@/types";
import axios from "axios";

export async function checkIfUserExists(email: string) {
  try {
    const response = await axios.post("/user/user-exists", {
      email,
    });

    if (response.status === 404) {
      return null;
    }

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function registerUser(data: RegisteredUser) {
  try {
    const { name, username, email, password } = data;

    const response = await axios.post("/user/signup", {
      name,
      username,
      email,
      password,
    });

    if (response.status === 400) {
      return null;
    }

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function checkAuthStatus(token: string | null | undefined) {
  try {
    const response = await axios.get("/user/auth-status", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserById(userId: string | undefined) {
  try {
    const response = await axios.post("/user/get-user", {
      userId,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function followUser(
  userId: string | undefined,
  followingUserId: string | undefined,
  token: string | null | undefined
) {
  try {
    const response = await axios.put(
      "/user/follow-user",
      {
        currentUserId: userId,
        followingUserId: followingUserId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function unfollowUser(
  userId: string | undefined,
  followingUserId: string | undefined,
  token: string | null | undefined
) {
  try {
    const response = await axios.put(
      "/user/unfollow-user",
      {
        currentUserId: userId,
        followingUserId: followingUserId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function editUser(
  params: EditUser,
  token: string | null | undefined
) {
  try {
    const {
      userId,
      name,
      username,
      profilePic,
      coverPic,
      bio,
      websiteUrl,
      phoneNumber,
    } = params;

    const response = await axios.put(
      "/user/edit-user-info",
      {
        userId,
        name,
        username,
        websiteUrl,
        phoneNumber,
        bio,
        profilePic,
        coverPic,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function createProduct(
  params: CreateProduct,
  token: string | null | undefined
) {
  try {
    const { name, userId, description, price, images } = params;

    const response = await axios.post("/product/create", {
      name,
      userId,
      description,
      price,
      images,
      token,
    });

    if (response.status === 400) {
      throw new Error("Failed to create product");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getUserProducts(
  userId: string | undefined,
  category?: string | null,
  onSale?: string | null,
  search?: string | null
) {
  try {
    const response = await axios.post("/product/get-products", {
      userId,
      category,
      onSale,
      search,
    });

    if (response.status === 404) {
      throw new Error("Failed to fetch products");
    }

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getProductById(productId: string | undefined) {
  try {
    const response = await axios.post("/product/get-product", {
      productId,
    });

    if (response.status === 404) {
      throw new Error("Failed to fetch products");
    }

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function addProductReview(params: {
  userId: string | undefined;
  productId: string | undefined;
  content: string;
  rating: number;
}) {
  const { userId, content, productId, rating } = params;

  try {
    const response = await axios.post("/review/add", {
      userId,
      productId,
      content,
      rating,
    });

    if (response.status === 400) {
      throw new Error("Failed to add review");
    }

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getProductReviews(params: {
  productId: string | undefined;
}) {
  const { productId } = params;

  try {
    const response = await axios.post("/review/get-reviews", {
      productId,
    });

    if (response.status === 400) {
      throw new Error("Failed to get reviews");
    }

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function addRemoveItemFromCart(params: {
  userId: string | undefined;
  productId: string | undefined;
}) {
  const { userId, productId } = params;

  try {
    const response = await axios.post("/cart/add-remove", {
      userId,
      productId,
    });

    if (response.status === 400 || response.status === 404) {
      throw new Error("Failed to fetch");
    }

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getTopShops() {
  try {
    const response = await axios.post("/user/get-popular-users");

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function toggleFavorite(params: {
  userId: string | undefined;
  productId: string | undefined;
}) {
  const { userId, productId } = params;

  try {
    const response = await axios.put("/product/toggle-favorite", {
      userId,
      productId,
    });

    if (response.status === 400 || response.status === 404) {
      throw new Error("Failed to fetch");
    }

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function removeItemFromCart(params: {
  userId: string | undefined;
  productId: string | undefined;
}) {
  const { userId, productId } = params;

  try {
    const response = await axios.put("/cart/remove-product", {
      userId,
      productId,
    });

    if (response.status === 400 || response.status === 404) {
      throw new Error("Failed to fetch");
    }

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function addUserReview(params: {
  userId: string | undefined;
  content: string;
  rating: number;
  userToAddToId: string | undefined;
}) {
  const { userId, content, rating, userToAddToId } = params;

  try {
    const response = await axios.post("/review/add-user", {
      userId,
      content,
      rating,
      userToAddToId,
    });

    if (response.status === 400) {
      throw new Error("Failed to add review");
    }

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserReviews(params: { userId: string | undefined }) {
  const { userId } = params;

  try {
    const response = await axios.post("/review/get-user-reviews", {
      userId,
    });

    if (response.status === 400) {
      throw new Error("Failed to get reviews");
    }

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteProduct(productId: string | undefined) {
  try {
    const response = await axios.post("/product/delete-product", {
      productId,
    });

    if (response.status === 404) {
      throw new Error("Failed to get reviews");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getHomeSearchResults(search: string) {
  try {
    const response = await axios.post("/user/get-search-results", {
      search,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function editProduct(values: {
  productId: string | undefined;
  name: string;
  description: string;
  price: number;
  isOnSale: boolean;
  salePrice: number;
  isOutOfStock: boolean;
}) {
  const {
    productId,
    name,
    description,
    price,
    isOnSale,
    salePrice,
    isOutOfStock,
  } = values;

  try {
    const response = await axios.patch("/product/edit-product", {
      productId,
      name,
      description,
      price,
      isOnSale,
      salePrice,
      isOutOfStock,
    });

    if (response.status === 404) {
      throw new Error("Failed to get reviews");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getCartTotal(userId: string | undefined) {
  try {
    const response = await axios.post("/cart/get-cart-total", {
      userId,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getMostRatedProducts() {
  try {
    const response = await axios.get("/product/get-most-rated-products");

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getOnSaleProducts() {
  try {
    const response = await axios.get("/product/get-onsale-products");

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getRecommendedProducts(productId: string) {
  try {
    const response = await axios.post("/product/get-recommended-products", {
      productId,
    });

    if (response.status === 404) {
      throw new Error("Failed to fetch products");
    }

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getAdminAllUsers(token: string | null | undefined) {
  try {
    const response = await axios.get("/user/get-all-users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 404) {
      throw new Error("Failed to fetch users");
    }

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function adminEditProductName(
  params: {
    productId: string;
    name: string;
  },
  token: string | null | undefined
) {
  try {
    const { productId, name } = params;

    const response = await axios.put(
      "/product/admin-edit-name",
      {
        productId,
        name,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 404 || response.status === 400) {
      throw new Error("Failed to edit product name");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function adminEditProductDescription(
  params: {
    productId: string;
    description: string;
  },
  token: string | null | undefined
) {
  try {
    const { productId, description } = params;

    const response = await axios.put(
      "/product/admin-edit-description",
      {
        productId,
        description,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 404 || response.status === 400) {
      throw new Error("Failed to edit product description");
    }
  } catch (error) {
    console.log(error);
  }
}
export async function adminEditProductPrice(
  params: {
    productId: string;
    price: number;
  },
  token: string | null | undefined
) {
  try {
    const { productId, price } = params;

    const response = await axios.put(
      "/product/admin-edit-price",
      {
        productId,
        price,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 404 || response.status === 400) {
      throw new Error("Failed to edit product price");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function adminGetSiteDetails(token: string | null | undefined) {
  try {
    const response = await axios.get("/user/get-site-details", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
}
