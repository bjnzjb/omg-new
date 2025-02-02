'use client';

import { Badge } from 'components/ui/badge';
import { Button } from 'components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from 'components/ui/card';

import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table,
  TableCell
} from 'components/ui/table';
import { useEffect, useState } from 'react';

export default function CustomersPage() {
  interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  }

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8686/api/v1/users')
      .then((res) => res.json())
      .then((data) => setUsers(data.data));
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>User</CardTitle>
        <CardDescription>View all customers and their orders.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                ID<span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Price</TableHead>
              <TableHead className="hidden md:table-cell">
                Total Sales
              </TableHead>
              <TableHead className="hidden md:table-cell">Created at</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableHead>{user.id}</TableHead>
                <TableHead>{user.firstName}</TableHead>
                <TableHead>{user.lastName}</TableHead>
                <TableHead>{user.email}</TableHead>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <form className="flex items-center w-full justify-between">
          <div className="flex"></div>
        </form>
      </CardFooter>
    </Card>
  );
}
