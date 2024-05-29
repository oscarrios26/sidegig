from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from sidegig import views
from rest_framework_simplejwt import views as jwt_views

router = routers.DefaultRouter()
router.register('users', views.UserViewSet)
router.register('jobs', views.JobViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('user/signup/', views.RegisterUsersView.as_view(), name="user-signup"),
    path('user/login/', views.LoginView.as_view(), name="user-login"),
    path('', include(router.urls))
]
