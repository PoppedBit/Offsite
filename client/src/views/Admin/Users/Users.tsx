import { Block } from "@mui/icons-material";
import { Tooltip, Typography } from "@mui/material";
import { useAdminUsers } from "hooks";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BanUserDialog, GreenCheck, PageHeader, Table } from "shared/components";
import { TableAction, TableColumn, TODO } from "shared/types";
import { formatTimestamp } from "shared/utils";
import { setErrorMessage } from "store/slices/notifications";
import { User } from "types/admin";

const Users = () => {
  const dispatch = useDispatch();

  const {
    isLoading,
    getUsers,
    banUser,
  } = useAdminUsers();
  const { users } = useSelector((state: TODO) => state.admin);

  const [isBanOpen, setIsBanOpen] = useState<number | undefined>(undefined);

  useEffect(() => {
    if(!users && !isLoading){
      getUsers();
    }
  }, [users, getUsers, isLoading]);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  const handleSubmitBan = (data: TODO) => {
    banUser(isBanOpen!, data.reason);
  }

  const columns: TableColumn[] = [
    {
      dataIndex: 'username',
      label: 'Username',
      searchable: true
    },
    {
      dataIndex: 'originalUsername',
      label: 'Original Username',
      searchable: true
    },
    {
      dataIndex: 'email',
      label: 'Email',
      searchable: true
    },
    {
      dataIndex: 'isEmailVerified',
      label: 'Email Verified',
      render: (isEmailVerified: boolean) => {
        return isEmailVerified ? <div>TODO</div> : '';
      }
    },
    {
      dataIndex: 'isAdmin',
      label: 'Is Admin?',
      render: (isAdmin: boolean) => {
        return isAdmin ? <GreenCheck /> : '';
      }
    },
    {
      dataIndex: 'isBanned',
      label: 'Is Banned?',
      render: (isBanned: boolean, user: User) => {
        console.log(user);
        return isBanned 
          ? <Tooltip title={`${user.banReason}: ${user.unBanDate}`}>
              <Block />
            </Tooltip> 
          : '';
      }
    },
    {
      dataIndex: 'createdAt',
      label: 'Created',
      render: (data: TODO) => {
        return formatTimestamp(data) ?? '';
      }
    }
  ];

  const actions: TableAction[] = [
    {
      label: 'Ban',
      onClick: (user: User) => {
        if(user.isBanned || user.isAdmin){
          dispatch(setErrorMessage("You cannot ban this user."));
          return;
        }
        setIsBanOpen(user.id);
      }
    },
  ];

  return (
    <>
      <PageHeader text="Users" />
      <Table 
        columns={columns} 
        data={users ?? []} 
        actions={actions} 
      />
      <BanUserDialog 
        isOpen={Boolean(isBanOpen)} 
        onSubmit={handleSubmitBan}
        onClose={() => setIsBanOpen(undefined)} 
        user={isBanOpen ? users.find((user: User) => user.id === isBanOpen) : {}}
      />
    </>
  );
}

export default Users;