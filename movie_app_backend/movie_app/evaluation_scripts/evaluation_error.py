import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, mean_squared_error
import matplotlib.pyplot as plt
from movie_app.recommendation_models.load_data import load_movie_index, load_similarity_matrix


similarity_matrix = load_similarity_matrix()
movie_index = load_movie_index().set_index('movieId')

ratings = pd.read_csv('movie_app/evaluation_scripts/ml-25m/ratings.csv')

# create average and overall rating (used for base estimators)
movie_rating = ratings.groupby('movieId')[['rating']].mean()
movie_rating_mean = ratings.rating.mean()

# create test set
ratings_per_user = ratings.groupby('userId')[['movieId']].count()
ratings_per_user.reset_index(inplace=True)
relevant_user = ratings_per_user.sample(1000).userId

ratings = ratings[ratings.userId.isin(relevant_user)]
ratings = ratings[ratings.movieId.isin(movie_index.index)]

ratings_train = ratings[:0]
ratings_test = ratings[:0]

for user in relevant_user:
    ratings_user = ratings[ratings.userId == user]
    ratings_user_train, ratings_user_test = train_test_split(ratings_user,
                                                             test_size=0.1)
    print('user: ' + str(user) +
          ', train_size: ' + str(ratings_user_train.shape) +
          ', test_size: ' + str(ratings_user_test.shape))
    ratings_train = ratings_train.append(ratings_user_train)
    ratings_test = ratings_test.append(ratings_user_test)


ratings_test['predicted_rating'] = 0
ratings_test['predicted_rating_base_1'] = 0
ratings_test['predicted_rating_base_2'] = 0
ratings_test['sum_similarity'] = 0


# Compute Predicted Ratings: Base Estimators 1 and 2, Similarity Model
for user in relevant_user:
    ratings_test_user = ratings_test[ratings_test.userId == user]
    ratings_train_user = ratings_train[ratings_train.userId == user]
    similarity_matrix_user = similarity_matrix[movie_index.loc[ratings_test_user.movieId].to_numpy().reshape(-1), :]
    similarity_matrix_user = similarity_matrix_user[:, movie_index.loc[ratings_train_user.movieId].to_numpy().reshape(-1)]
    ratings_train_array = ratings_train_user.rating.to_numpy()
    nr_relev_movies = min(15, similarity_matrix_user.shape[1])
    for i in range(similarity_matrix_user.shape[0]):
        row = similarity_matrix_user[i]
        similarity_matrix_user[i, row.argsort()[:-nr_relev_movies]] = 0
    sum_similarity_array = np.sum(similarity_matrix_user, 1)
    ratings_test_user['sum_similarity'] = sum_similarity_array
    ratings_test_user['predicted_rating'] = np.dot(similarity_matrix_user, ratings_train_array) / ratings_test_user['sum_similarity']
    # base estimator
    ratings_test_user['predicted_rating_base_1'] = np.mean(ratings_user_train.rating)
    ratings_test_user['predicted_rating_base_2'] = (np.mean(ratings_user_train.rating) + (movie_rating.loc[ratings_test_user.movieId, 'rating'] - movie_rating_mean)).to_numpy()
    # # rounding the result
    # if full_rating_user.loc[user]['full_rating'] > 0.95:
    #     ratings_test_user['predicted_rating'] = np.round(ratings_test_user['predicted_rating'])
    # else:
    #     ratings_test_user['predicted_rating'] = np.round(ratings_test_user['predicted_rating']/0.5)*0.5
    ratings_test.loc[ratings_test_user.index, 'predicted_rating'] = ratings_test_user['predicted_rating']
    ratings_test.loc[ratings_test_user.index, 'predicted_rating_base_1'] = ratings_test_user['predicted_rating_base_1']
    ratings_test.loc[ratings_test_user.index, 'predicted_rating_base_2'] = ratings_test_user['predicted_rating_base_2']
    ratings_test.loc[ratings_test_user.index, 'sum_similarity'] = ratings_test_user['sum_similarity']


ratings_test['error'] = ratings_test['rating'] - ratings_test['predicted_rating']
# ratings_test['predicted_rating'] = np.round(ratings_test['predicted_rating'])

# MAE's
print('MAE - Base Estimator 1: ' + str(mean_absolute_error(ratings_test['rating'], ratings_test['predicted_rating_base_1'])))
print('MAE - Base Estimator 2: ' + str(mean_absolute_error(ratings_test['rating'], ratings_test['predicted_rating_base_2'])))
print('MAE - Similarity Model: ' + str(mean_absolute_error(ratings_test['rating'], ratings_test['predicted_rating'])))

# MSE's
print('MSE - Base Estimator 1: ' + str(mean_squared_error(ratings_test['rating'], ratings_test['predicted_rating_base_1'])))
print('MSE - Base Estimator 2: ' + str(mean_squared_error(ratings_test['rating'], ratings_test['predicted_rating_base_2'])))
print('MSE - Similarity Model: ' + str(mean_squared_error(ratings_test['rating'], ratings_test['predicted_rating'])))


########## Error Analysis ########################

ratings_test.groupby('predicted_rating').aggregate({'error': ['mean', 'count']})
# error per user
error_per_user = ratings_test.groupby('userId').aggregate({'error': ['mean', 'count'],
                                                           'rating': ['mean', 'var']})

# (mean error) vs. (mean of ratings)
plt.scatter(error_per_user[('rating', 'mean')],
            error_per_user[('error', 'mean')],
            s=0.3)
plt.show()

# (mean error) vs. (variance of ratings)
plt.scatter(error_per_user[('rating', 'var')],
            error_per_user[('error', 'mean')],
            s=0.3)
plt.show()

# (mean error) vs. (number of ratings)
plt.scatter(error_per_user[('error', 'count')],
            error_per_user[('error', 'mean')],
            s=0.3)
plt.show()

# plt.hist(ratings_test['rating'], bins=50)
plt.hist(ratings_test['rating'], bins=50, alpha=0.4)
plt.hist(ratings_test['predicted_rating'], bins=50, alpha=0.4)
plt.show()

plt.hist(ratings_test.groupby('userId')[['error']].mean().to_numpy(), bins=30)
plt.show()
