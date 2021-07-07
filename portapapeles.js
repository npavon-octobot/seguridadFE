<TextField
  variant="outlined"
  margin="normal"
  required
  fullWidth
  name="password"
  label="Password"
  type="password"
  id="password"
  autoComplete="current-password"
/>;

<FormControlLabel
  control={<Checkbox value="remember" color="primary" />}
  label="Remember me"
/>;
