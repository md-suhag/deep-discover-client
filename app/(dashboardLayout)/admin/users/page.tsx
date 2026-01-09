import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getAllUsers } from "@/services/users";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function AdminUsersPage() {
  const result = await getAllUsers();
  const users = result?.data || [];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">User Management</h1>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
             {users.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                        No users found.
                    </TableCell>
                </TableRow>
            ) : (
                users.map((user: any) => (
                    <TableRow key={user._id}>
                        <TableCell className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={user.profileImg} />
                                <AvatarFallback>{user.name?.[0] || 'U'}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{user.name}</span>
                        </TableCell>
                        <TableCell>
                             <Badge variant={user.role === 'ADMIN' ? 'destructive' : user.role === 'GUIDE' ? 'default' : 'secondary'}>
                                {user.role}
                             </Badge>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                             <Badge variant="outline">Active</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                             {/* Actions like Ban/Edit */}
                             <span className="text-sm text-muted-foreground cursor-pointer hover:underline">Edit</span>
                        </TableCell>
                    </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
