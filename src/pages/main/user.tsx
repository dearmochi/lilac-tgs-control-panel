import * as React from 'react';
import axios from '../../middleware/axios';
import { getServerInfoState } from '../../store/serverinfo';
import { AdministrationRights } from '../../types/tgs';
import { UserUpdateRequest } from '../../types/tgs/request';
import { UserResponse } from '../../types/tgs/response';
import { hasRight } from '../../util/rights';

const PageUser = () => {
  const state = getServerInfoState();
  const [user, setUser] = React.useState<UserResponse | undefined>();
  const [form, setForm] = React.useState<UserUpdateRequest | undefined>();

	const formSubmit = (e: React.FormEvent) => {
		e.preventDefault();

    if (!user || !form) {
      return;
    }
    if (form.password !== form.passwordConfirm) {
      alert('Passwords do not match!');
      return;
    }
    if (form.password?.length! > 0 && form.password?.length! < state?.minimumPasswordLength!) {
      alert('Password not long enough!');
      return;
    }
    
    const request: UserUpdateRequest = {
      id: user.id,
      enabled: form.enabled,
    };
    if (form.password?.length! > 0) {
      request.password = form.password;
    }
    
    axios.post<UserUpdateRequest>('/User', request)
      .then(response => {
        alert('OK!');
      })
      .catch(error => {
        console.log('Error ' + error.response?.status);
      })
	};

	const formUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    setForm({ ...form, [target.name]: value });
	};

  React.useEffect(() => {
    axios.get<UserResponse>('/User')
      .then(response => {
        setUser(response.data);
        setForm({ ...form, enabled: response.data.enabled });
      })
  }, []);

  return (
    <div>
      ID: {user?.id}<br />
      Created on: {user?.createdAt}<br />
      Created by: {user?.createdBy?.name} ({user?.createdBy?.id})<br />
      System identifier: {user?.systemIdentifier}
      <br /><br />
      <form onSubmit={formSubmit}>
        Enabled:
        <input
          type="checkbox" 
          name="enabled"
          checked={form?.enabled || false}
          disabled={!hasRight(user?.permissionSet?.administrationRights, AdministrationRights.WriteUsers)}
          onChange={formUpdate}
        />
        <br />
        New Password:&nbsp;
        <input
          type="password"
          name="password"
          placeholder={(state?.minimumPasswordLength || 8) + ' minimum chars'}
          onChange={formUpdate}
        /><br />
        Confirm Password:&nbsp;
        <input
          type="password"
          name="passwordConfirm"
          onChange={formUpdate}
        /><br />
        <input type="submit" />
      </form>
    </div>
  );
};

//
export default PageUser;