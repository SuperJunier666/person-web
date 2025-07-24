import api from './api';

// 用户相关的接口类型定义
export interface LoginParams {
  username: string;
  password: string;
}

export interface RegisterParams extends LoginParams {
  email: string;
  nickname?: string;
}

export interface UserInfo {
  id: number;
  username: string;
  email: string;
  nickname?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

// 用户服务类
export const userService = {
  // 用户登录
  async login(params: LoginParams) {
    return api.post<UserInfo>('/auth/login', params);
  },

  // 用户注册
  async register(params: RegisterParams) {
    return api.post<UserInfo>('/auth/register', params);
  },

  // 获取当前用户信息
  async getCurrentUser() {
    return api.get<UserInfo>('/user/current');
  },

  // 更新用户信息
  async updateUserInfo(data: Partial<UserInfo>) {
    return api.put<UserInfo>('/user/profile', data);
  },

  // 修改密码
  async changePassword(oldPassword: string, newPassword: string) {
    return api.put('/user/password', { oldPassword, newPassword });
  },

  // 退出登录
  async logout() {
    // 模拟退出登录成功
    localStorage.removeItem('token');
    return Promise.resolve(true);
  },
};