// convex/seedUsers.ts

import { mutation } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export default mutation(async ({ db }) => {
  const permissions = [
    {
      action: "read | write | delete | create",
      access: "any",
      description: "Read any data",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      action: "write",
      access: "own",
      description: "Write own data",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    // Add more permissions as needed
  ];

  const permissionIds: Record<string, Id<"permissionsTable">> = {};

  for (const permissionData of permissions) {
    const existingPermission = await db
      .query("permissionsTable")
      .filter((q) => q.eq(q.field("action"), permissionData.action))
      .filter((q) => q.eq(q.field("access"), permissionData.access))
      .first();

    if (!existingPermission) {
      const permissionId = await db.insert("permissionsTable", permissionData);
      console.log(
        `Inserted permission: ${permissionData.action} ${permissionData.access}`
      );
      permissionIds[`${permissionData.action}_${permissionData.access}`] =
        permissionId;
    } else {
      console.log(
        `Permission ${permissionData.action} ${permissionData.access} already exists.`
      );
      permissionIds[`${permissionData.action}_${permissionData.access}`] =
        existingPermission._id;
    }
  }

  // 2. Seed Roles
  const roles = [
    {
      userId: "admin_user_id", // Placeholder, will be updated later
      role: "admin",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      userId: "user_user_id", // Placeholder, will be updated later
      role: "user",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
  ];

  const roleIds: Record<string, Id<"roleTable">> = {};

  for (const roleData of roles) {
    const existingRole = await db
      .query("roleTable")
      .filter((q) => q.eq(q.field("userId"), roleData.userId))
      .filter((q) => q.eq(q.field("role"), roleData.role))
      .first();

    if (!existingRole) {
      const roleId = await db.insert("roleTable", roleData);
      console.log(`Inserted role: ${roleData.role}`);
      roleIds[roleData.role] = roleId;
    } else {
      console.log(`Role ${roleData.role} already exists.`);
      roleIds[roleData.role] = existingRole._id;
    }
  }

  // 3. Seed Users
  const users = [
    {
      username: "admin",
      email: "admin@example.com",
      diamonds: 1000,
      isPlatinum: true,
      friends: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
      userId: "admin_user_id",
      session: [],
      role: roleIds["admin"],
      avatarUrl: null,
    },
    {
      username: "john_doe",
      email: "john@example.com",
      diamonds: 500,
      isPlatinum: false,
      friends: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
      userId: "user_user_id",
      session: [],
      role: roleIds["user"],
      avatarUrl: null,
    },
    // Add more users as needed
  ];

  for (const userData of users) {
    try {
      const existingUser = await db
        .query("users")
        .filter((q) => q.eq(q.field("email"), userData.email))
        .first();

      if (!existingUser) {
        await db.insert("users", userData);
        console.log(`Inserted user ${userData.username} (${userData.email})`);
      } else {
        console.log(`User with email ${userData.email} already exists.`);
      }
    } catch (error) {
      console.error(`Error inserting user ${userData.email}:`, error);
    }
  }

  console.log("User data seeding process completed.");
});
