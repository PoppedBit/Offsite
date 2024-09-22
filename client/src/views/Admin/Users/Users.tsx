import { Typography } from "@mui/material";
import { useAdminUsers } from "hooks";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { GreenCheck, PageHeader, Table } from "shared/components";
import { TableAction, TableColumn, TODO } from "shared/types";
import { formatTimestamp } from "shared/utils";

const Users = () => {

   const {
    isLoading,
    getUsers,
   } = useAdminUsers();
   const { users } = useSelector((state: TODO) => state.admin);

  useEffect(() => {
    if(!users && !isLoading){
      getUsers();
    }
  }, [users, getUsers, isLoading]);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
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
      render: (data: TODO) => {
        return data ? <div>TODO</div> : '';
      }
    },
    {
      dataIndex: 'isAdmin',
      label: 'Is Admin?',
      render: (data: TODO) => {
        return data ? <GreenCheck /> : '';
      }
    },
    {
      dataIndex: 'isBanned',
      label: 'Is Banned?',
      render: (data: TODO) => {
        return data ? <div>TODO</div> : '';
      }
    },
    {
      dataIndex: 'createdTimestamp',
      label: 'Created',
      render: (data: TODO) => {
        return formatTimestamp(data) ?? '';
      }
    }
  ];

  console.log(users);

  const actions: TableAction[] = [
    {
      label: 'Ban',
      onClick: () => {
        alert('TODO');
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
    </>
  );
}

export default Users;