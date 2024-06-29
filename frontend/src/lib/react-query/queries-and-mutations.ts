import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addProductReview,
  addRemoveItemFromCart,
  addUserReview,
  adminEditProductDescription,
  adminEditProductName,
  adminEditProductPrice,
  adminGetSiteDetails,
  checkAuthStatus,
  checkIfUserExists,
  createProduct,
  deleteProduct,
  editProduct,
  editUser,
  followUser,
  getAdminAllUsers,
  getCartTotal,
  getHomeSearchResults,
  getMostRatedProducts,
  getOnSaleProducts,
  getProductById,
  getProductReviews,
  getRecommendedProducts,
  getTopShops,
  getUserById,
  getUserProducts,
  getUserReviews,
  registerUser,
  removeItemFromCart,
  toggleFavorite,
  unfollowUser,
} from "../actions/app.actions";
import { CreateProduct, EditUser, RegisteredUser } from "@/types";
import { QUERY_KEYS } from "./query-keys";

export const useCheckIfUserExistsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (email: string) => checkIfUserExists(email),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USER],
      });
    },
  });
};

export const useSignUpUserMutation = () => {
  return useMutation({
    mutationFn: (data: RegisteredUser) => registerUser(data),
  });
};

export const useGetUserByIdQuery = (userId: string | undefined) => {
  return useQuery({
    queryKey: [QUERY_KEYS.USER, userId],
    queryFn: () => getUserById(userId),
  });
};

export const useCheckAuthStatusQuery = (token: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.USER],
    queryFn: () => checkAuthStatus(token),
    retry: false,
  });
};

export const useFollowUserMutation = () => {
  return useMutation({
    mutationFn: ({
      userId,
      follwingUserId,
    }: {
      userId: string | undefined;
      follwingUserId: string | undefined;
    }) => followUser(userId, follwingUserId),
  });
};

export const useUnFollowUserMutation = () => {
  return useMutation({
    mutationFn: ({
      userId,
      follwingUserId,
    }: {
      userId: string | undefined;
      follwingUserId: string | undefined;
    }) => unfollowUser(userId, follwingUserId),
  });
};

export const useEditUserInfoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: EditUser) => editUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USER],
      });
    },
  });
};

export const useCreateProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: CreateProduct) => createProduct(values),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_PRODUCTS],
      });
    },
  });
};

export const useGetUserProductsQuery = (
  userId: string | undefined,
  category?: string | null,
  onSale?: string | null,
  search?: string | null
) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_PRODUCTS, userId],
    queryFn: () => getUserProducts(userId, category, onSale, search),
  });
};

export const useGetProductByIdQuery = (productId: string | undefined) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_PRODUCT, productId],
    queryFn: () => getProductById(productId),
  });
};

export const useCreateProductReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: {
      userId: string | undefined;
      productId: string | undefined;
      content: string;
      rating: number;
    }) => addProductReview(values),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_PRODUCT_REVIEWS],
      });
    },
  });
};

export const useGetProductReviewsQuery = (productId: string | undefined) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_PRODUCT_REVIEWS, productId],
    queryFn: () =>
      getProductReviews({
        productId,
      }),
  });
};

export const useAddRemoveItemFromCartMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: {
      userId: string | undefined;
      productId: string | undefined;
    }) => addRemoveItemFromCart(values),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USER],
      });
    },
  });
};

export const useGetCartProductByIdQuery = (productId: string | undefined) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CART_PRODUCT, productId],
    queryFn: () => getProductById(productId),
  });
};

export const useGetPopularUserShopsQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POPULAR_USERS],
    queryFn: () => getTopShops(),
  });
};

export const useToggleFavoriteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: {
      userId: string | undefined;
      productId: string | undefined;
    }) => toggleFavorite(values),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USER],
      });
    },
  });
};

export const useRemoveItemFromCartMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: {
      userId: string | undefined;
      productId: string | undefined;
    }) => removeItemFromCart(values),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USER],
      });
    },
  });
};

export const useCreateUserReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: {
      userId: string | undefined;
      content: string;
      rating: number;
      userToAddToId: string | undefined;
    }) => addUserReview(values),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_REVIEWS],
      });
    },
  });
};

export const useGetUserReviewsQuery = (userId: string | undefined) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_REVIEWS, userId],
    queryFn: () =>
      getUserReviews({
        userId,
      }),
  });
};

export const useDeleteProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string | undefined) => deleteProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_PRODUCTS],
      });
    },
  });
};

export const useGetHomeSearchResultsQuery = (search: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_HOME_SEARCH_RESULTS],
    queryFn: () => getHomeSearchResults(search),
  });
};

export const useEditProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: {
      productId: string | undefined;
      name: string;
      description: string;
      price: number;
      isOnSale: boolean;
      salePrice: number;
      isOutOfStock: boolean;
    }) => editProduct(values),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_PRODUCTS],
      });
    },
  });
};

export const useGetCartTotalQuery = (userId: string | undefined) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CART_TOTAL],
    queryFn: () => getCartTotal(userId),
  });
};

export const useGetMostRatedProductsQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_MOST_RATED_PRODUCTS],
    queryFn: () => getMostRatedProducts(),
  });
};

export const useGetOnSaleProductsQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ONSALE_PRODUCTS],
    queryFn: () => getOnSaleProducts(),
  });
};

export const useGetRecommendedProductsQuery = (productId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECOMMENDED_PRODUCTS],
    queryFn: () => getRecommendedProducts(productId),
  });
};

export const useGetAdminAllUsersQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ADMIN_USERS],
    queryFn: () => getAdminAllUsers(),
  });
};

export const useAdminEditProductNameMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { productId: string; name: string }) =>
      adminEditProductName(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_PRODUCT],
      });
    },
  });
};

export const useAdminEditProductDescriptionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { productId: string; description: string }) =>
      adminEditProductDescription(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_PRODUCT],
      });
    },
  });
};

export const useAdminEditProductPriceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { productId: string; price: number }) =>
      adminEditProductPrice(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_PRODUCT],
      });
    },
  });
};

export const useGetAdminSiteDetailsQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_SITE_DETAILS],
    queryFn: () => adminGetSiteDetails(),
  });
};
