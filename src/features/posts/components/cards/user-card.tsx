"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { createAvatarFallback } from "@/features/auth/utils";
import { useCurrent } from "@/features/auth/api";

export default function UserCard() {
  const { data: user, isLoading } = useCurrent();

  if (isLoading) return <UserCardSkeleton />;

  if (!user) return null;

  const { name, email } = user;
  const avatarFallback = createAvatarFallback(name, email);

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="size-16">
            <AvatarFallback className="font-medium text-lg flex items-center justify-center select-none">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-bold">{name}</h2>
          <p className="text-muted-foreground">{email}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function UserCardSkeleton() {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center space-y-4">
          <Skeleton className="size-16 rounded-full" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-6 w-1/3" />
        </div>
      </CardContent>
    </Card>
  );
}
