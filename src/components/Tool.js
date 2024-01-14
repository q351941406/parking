export function isUserLoggedIn() {
    // 从localStorage中获取保存的登录令牌
    const token = localStorage.getItem('userInfo');
  
    // 检查令牌是否存在且有效
    // 这里的示例仅检查令牌是否存在
    // 实际应用中，可能还需要检查令牌是否过期等其他条件
    return token !== null;
}




