import { ViewEntity } from 'typeorm';
import { Admin } from './admin';
import { AdminRoleRel } from './admin-role-rel';
import { AdminResourceRel } from './admin-resource-rel';
import { AdminPolicyMix } from './admin-policy-mix';

@ViewEntity({
  expression: (connection => connection.createQueryBuilder()
      .select('a.id,a.username,a.password')
      .addSelect(`group_concat(distinct arr.role_key separator ',')`, 'role')
      .addSelect(`group_concat(distinct arer.resource_key separator ',')`, 'resource')
      .addSelect(`group_concat(distinct concat(apm.acl_key, ':', apm.policy) separator ',')`, 'acl')
      .addSelect('a.permission, a.call,a.email, a.phone,a.avatar,a.status,a.create_time,a.update_time')
      .from(Admin, 'a')
      .innerJoin(AdminRoleRel, 'arr', 'a.id = arr.admin_id')
      .leftJoin(AdminResourceRel, 'arer', 'a.id = arer.admin_id')
      .leftJoin(AdminPolicyMix, 'apm', 'a.id = apm.admin_id')
      .groupBy('a.id')
  ),
})
export class adminMix {
}
