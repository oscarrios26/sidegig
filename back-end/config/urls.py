from django.contrib import admin
from django.urls import path, include
from sidegig import views
from rest_framework_simplejwt import views as jwt_views
from rest_framework_simplejwt.views import TokenVerifyView
from rest_framework import routers
from sidegig.views import  Jobs

router = routers.DefaultRouter()
router.register('jobs', Jobs)
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('user/signup/', views.RegisterUsersView.as_view(), name="user-signup"),
    path('user/login/', views.LoginView.as_view(), name="user-login"),
    path('verify/<int:pk>/', views.VerifyUsersView.as_view()),
    path('', include(router.urls))
]
