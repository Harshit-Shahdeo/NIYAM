import type * as runtime from "@prisma/client/runtime/library";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type UserModel = runtime.Types.Result.DefaultSelection<Prisma.$UserPayload>;
export type AggregateUser = {
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
export type UserMinAggregateOutputType = {
    id: string | null;
    institutionId: string | null;
    departmentId: string | null;
    name: string | null;
    email: string | null;
    role: $Enums.UserRole | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserMaxAggregateOutputType = {
    id: string | null;
    institutionId: string | null;
    departmentId: string | null;
    name: string | null;
    email: string | null;
    role: $Enums.UserRole | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserCountAggregateOutputType = {
    id: number;
    institutionId: number;
    departmentId: number;
    name: number;
    email: number;
    role: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type UserMinAggregateInputType = {
    id?: true;
    institutionId?: true;
    departmentId?: true;
    name?: true;
    email?: true;
    role?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserMaxAggregateInputType = {
    id?: true;
    institutionId?: true;
    departmentId?: true;
    name?: true;
    email?: true;
    role?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserCountAggregateInputType = {
    id?: true;
    institutionId?: true;
    departmentId?: true;
    name?: true;
    email?: true;
    role?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type UserAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | UserCountAggregateInputType;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
};
export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUser[P]> : Prisma.GetScalarType<T[P], AggregateUser[P]>;
};
export type UserGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithAggregationInput | Prisma.UserOrderByWithAggregationInput[];
    by: Prisma.UserScalarFieldEnum[] | Prisma.UserScalarFieldEnum;
    having?: Prisma.UserScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserCountAggregateInputType | true;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
};
export type UserGroupByOutputType = {
    id: string;
    institutionId: string;
    departmentId: string | null;
    name: string;
    email: string;
    role: $Enums.UserRole;
    createdAt: Date;
    updatedAt: Date;
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UserGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]>;
}>>;
export type UserWhereInput = {
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    id?: Prisma.StringFilter<"User"> | string;
    institutionId?: Prisma.StringFilter<"User"> | string;
    departmentId?: Prisma.StringNullableFilter<"User"> | string | null;
    name?: Prisma.StringFilter<"User"> | string;
    email?: Prisma.StringFilter<"User"> | string;
    role?: Prisma.EnumUserRoleFilter<"User"> | $Enums.UserRole;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    institution?: Prisma.XOR<Prisma.InstitutionScalarRelationFilter, Prisma.InstitutionWhereInput>;
    department?: Prisma.XOR<Prisma.DepartmentNullableScalarRelationFilter, Prisma.DepartmentWhereInput> | null;
    serviceRequests?: Prisma.ServiceRequestListRelationFilter;
    bookings?: Prisma.BookingListRelationFilter;
    approvals?: Prisma.ApprovalListRelationFilter;
    auditEvents?: Prisma.AuditEventListRelationFilter;
};
export type UserOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    institutionId?: Prisma.SortOrder;
    departmentId?: Prisma.SortOrderInput | Prisma.SortOrder;
    name?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    institution?: Prisma.InstitutionOrderByWithRelationInput;
    department?: Prisma.DepartmentOrderByWithRelationInput;
    serviceRequests?: Prisma.ServiceRequestOrderByRelationAggregateInput;
    bookings?: Prisma.BookingOrderByRelationAggregateInput;
    approvals?: Prisma.ApprovalOrderByRelationAggregateInput;
    auditEvents?: Prisma.AuditEventOrderByRelationAggregateInput;
};
export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    institutionId_email?: Prisma.UserInstitutionIdEmailCompoundUniqueInput;
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    institutionId?: Prisma.StringFilter<"User"> | string;
    departmentId?: Prisma.StringNullableFilter<"User"> | string | null;
    name?: Prisma.StringFilter<"User"> | string;
    email?: Prisma.StringFilter<"User"> | string;
    role?: Prisma.EnumUserRoleFilter<"User"> | $Enums.UserRole;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    institution?: Prisma.XOR<Prisma.InstitutionScalarRelationFilter, Prisma.InstitutionWhereInput>;
    department?: Prisma.XOR<Prisma.DepartmentNullableScalarRelationFilter, Prisma.DepartmentWhereInput> | null;
    serviceRequests?: Prisma.ServiceRequestListRelationFilter;
    bookings?: Prisma.BookingListRelationFilter;
    approvals?: Prisma.ApprovalListRelationFilter;
    auditEvents?: Prisma.AuditEventListRelationFilter;
}, "id" | "institutionId_email">;
export type UserOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    institutionId?: Prisma.SortOrder;
    departmentId?: Prisma.SortOrderInput | Prisma.SortOrder;
    name?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.UserCountOrderByAggregateInput;
    _max?: Prisma.UserMaxOrderByAggregateInput;
    _min?: Prisma.UserMinOrderByAggregateInput;
};
export type UserScalarWhereWithAggregatesInput = {
    AND?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    OR?: Prisma.UserScalarWhereWithAggregatesInput[];
    NOT?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"User"> | string;
    institutionId?: Prisma.StringWithAggregatesFilter<"User"> | string;
    departmentId?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null;
    name?: Prisma.StringWithAggregatesFilter<"User"> | string;
    email?: Prisma.StringWithAggregatesFilter<"User"> | string;
    role?: Prisma.EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string;
};
export type UserCreateInput = {
    id?: string;
    name: string;
    email: string;
    role: $Enums.UserRole;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    institution: Prisma.InstitutionCreateNestedOneWithoutUsersInput;
    department?: Prisma.DepartmentCreateNestedOneWithoutUsersInput;
    serviceRequests?: Prisma.ServiceRequestCreateNestedManyWithoutUserInput;
    bookings?: Prisma.BookingCreateNestedManyWithoutUserInput;
    approvals?: Prisma.ApprovalCreateNestedManyWithoutApproverInput;
    auditEvents?: Prisma.AuditEventCreateNestedManyWithoutActorInput;
};
export type UserUncheckedCreateInput = {
    id?: string;
    institutionId: string;
    departmentId?: string | null;
    name: string;
    email: string;
    role: $Enums.UserRole;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    serviceRequests?: Prisma.ServiceRequestUncheckedCreateNestedManyWithoutUserInput;
    bookings?: Prisma.BookingUncheckedCreateNestedManyWithoutUserInput;
    approvals?: Prisma.ApprovalUncheckedCreateNestedManyWithoutApproverInput;
    auditEvents?: Prisma.AuditEventUncheckedCreateNestedManyWithoutActorInput;
};
export type UserUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    institution?: Prisma.InstitutionUpdateOneRequiredWithoutUsersNestedInput;
    department?: Prisma.DepartmentUpdateOneWithoutUsersNestedInput;
    serviceRequests?: Prisma.ServiceRequestUpdateManyWithoutUserNestedInput;
    bookings?: Prisma.BookingUpdateManyWithoutUserNestedInput;
    approvals?: Prisma.ApprovalUpdateManyWithoutApproverNestedInput;
    auditEvents?: Prisma.AuditEventUpdateManyWithoutActorNestedInput;
};
export type UserUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    institutionId?: Prisma.StringFieldUpdateOperationsInput | string;
    departmentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    serviceRequests?: Prisma.ServiceRequestUncheckedUpdateManyWithoutUserNestedInput;
    bookings?: Prisma.BookingUncheckedUpdateManyWithoutUserNestedInput;
    approvals?: Prisma.ApprovalUncheckedUpdateManyWithoutApproverNestedInput;
    auditEvents?: Prisma.AuditEventUncheckedUpdateManyWithoutActorNestedInput;
};
export type UserCreateManyInput = {
    id?: string;
    institutionId: string;
    departmentId?: string | null;
    name: string;
    email: string;
    role: $Enums.UserRole;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    institutionId?: Prisma.StringFieldUpdateOperationsInput | string;
    departmentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserListRelationFilter = {
    every?: Prisma.UserWhereInput;
    some?: Prisma.UserWhereInput;
    none?: Prisma.UserWhereInput;
};
export type UserOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type UserInstitutionIdEmailCompoundUniqueInput = {
    institutionId: string;
    email: string;
};
export type UserCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    institutionId?: Prisma.SortOrder;
    departmentId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    institutionId?: Prisma.SortOrder;
    departmentId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    institutionId?: Prisma.SortOrder;
    departmentId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserScalarRelationFilter = {
    is?: Prisma.UserWhereInput;
    isNot?: Prisma.UserWhereInput;
};
export type UserNullableScalarRelationFilter = {
    is?: Prisma.UserWhereInput | null;
    isNot?: Prisma.UserWhereInput | null;
};
export type UserCreateNestedManyWithoutInstitutionInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutInstitutionInput, Prisma.UserUncheckedCreateWithoutInstitutionInput> | Prisma.UserCreateWithoutInstitutionInput[] | Prisma.UserUncheckedCreateWithoutInstitutionInput[];
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutInstitutionInput | Prisma.UserCreateOrConnectWithoutInstitutionInput[];
    createMany?: Prisma.UserCreateManyInstitutionInputEnvelope;
    connect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
};
export type UserUncheckedCreateNestedManyWithoutInstitutionInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutInstitutionInput, Prisma.UserUncheckedCreateWithoutInstitutionInput> | Prisma.UserCreateWithoutInstitutionInput[] | Prisma.UserUncheckedCreateWithoutInstitutionInput[];
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutInstitutionInput | Prisma.UserCreateOrConnectWithoutInstitutionInput[];
    createMany?: Prisma.UserCreateManyInstitutionInputEnvelope;
    connect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
};
export type UserUpdateManyWithoutInstitutionNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutInstitutionInput, Prisma.UserUncheckedCreateWithoutInstitutionInput> | Prisma.UserCreateWithoutInstitutionInput[] | Prisma.UserUncheckedCreateWithoutInstitutionInput[];
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutInstitutionInput | Prisma.UserCreateOrConnectWithoutInstitutionInput[];
    upsert?: Prisma.UserUpsertWithWhereUniqueWithoutInstitutionInput | Prisma.UserUpsertWithWhereUniqueWithoutInstitutionInput[];
    createMany?: Prisma.UserCreateManyInstitutionInputEnvelope;
    set?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    disconnect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    delete?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    connect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    update?: Prisma.UserUpdateWithWhereUniqueWithoutInstitutionInput | Prisma.UserUpdateWithWhereUniqueWithoutInstitutionInput[];
    updateMany?: Prisma.UserUpdateManyWithWhereWithoutInstitutionInput | Prisma.UserUpdateManyWithWhereWithoutInstitutionInput[];
    deleteMany?: Prisma.UserScalarWhereInput | Prisma.UserScalarWhereInput[];
};
export type UserUncheckedUpdateManyWithoutInstitutionNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutInstitutionInput, Prisma.UserUncheckedCreateWithoutInstitutionInput> | Prisma.UserCreateWithoutInstitutionInput[] | Prisma.UserUncheckedCreateWithoutInstitutionInput[];
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutInstitutionInput | Prisma.UserCreateOrConnectWithoutInstitutionInput[];
    upsert?: Prisma.UserUpsertWithWhereUniqueWithoutInstitutionInput | Prisma.UserUpsertWithWhereUniqueWithoutInstitutionInput[];
    createMany?: Prisma.UserCreateManyInstitutionInputEnvelope;
    set?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    disconnect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    delete?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    connect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    update?: Prisma.UserUpdateWithWhereUniqueWithoutInstitutionInput | Prisma.UserUpdateWithWhereUniqueWithoutInstitutionInput[];
    updateMany?: Prisma.UserUpdateManyWithWhereWithoutInstitutionInput | Prisma.UserUpdateManyWithWhereWithoutInstitutionInput[];
    deleteMany?: Prisma.UserScalarWhereInput | Prisma.UserScalarWhereInput[];
};
export type UserCreateNestedManyWithoutDepartmentInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutDepartmentInput, Prisma.UserUncheckedCreateWithoutDepartmentInput> | Prisma.UserCreateWithoutDepartmentInput[] | Prisma.UserUncheckedCreateWithoutDepartmentInput[];
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutDepartmentInput | Prisma.UserCreateOrConnectWithoutDepartmentInput[];
    createMany?: Prisma.UserCreateManyDepartmentInputEnvelope;
    connect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
};
export type UserUncheckedCreateNestedManyWithoutDepartmentInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutDepartmentInput, Prisma.UserUncheckedCreateWithoutDepartmentInput> | Prisma.UserCreateWithoutDepartmentInput[] | Prisma.UserUncheckedCreateWithoutDepartmentInput[];
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutDepartmentInput | Prisma.UserCreateOrConnectWithoutDepartmentInput[];
    createMany?: Prisma.UserCreateManyDepartmentInputEnvelope;
    connect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
};
export type UserUpdateManyWithoutDepartmentNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutDepartmentInput, Prisma.UserUncheckedCreateWithoutDepartmentInput> | Prisma.UserCreateWithoutDepartmentInput[] | Prisma.UserUncheckedCreateWithoutDepartmentInput[];
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutDepartmentInput | Prisma.UserCreateOrConnectWithoutDepartmentInput[];
    upsert?: Prisma.UserUpsertWithWhereUniqueWithoutDepartmentInput | Prisma.UserUpsertWithWhereUniqueWithoutDepartmentInput[];
    createMany?: Prisma.UserCreateManyDepartmentInputEnvelope;
    set?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    disconnect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    delete?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    connect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    update?: Prisma.UserUpdateWithWhereUniqueWithoutDepartmentInput | Prisma.UserUpdateWithWhereUniqueWithoutDepartmentInput[];
    updateMany?: Prisma.UserUpdateManyWithWhereWithoutDepartmentInput | Prisma.UserUpdateManyWithWhereWithoutDepartmentInput[];
    deleteMany?: Prisma.UserScalarWhereInput | Prisma.UserScalarWhereInput[];
};
export type UserUncheckedUpdateManyWithoutDepartmentNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutDepartmentInput, Prisma.UserUncheckedCreateWithoutDepartmentInput> | Prisma.UserCreateWithoutDepartmentInput[] | Prisma.UserUncheckedCreateWithoutDepartmentInput[];
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutDepartmentInput | Prisma.UserCreateOrConnectWithoutDepartmentInput[];
    upsert?: Prisma.UserUpsertWithWhereUniqueWithoutDepartmentInput | Prisma.UserUpsertWithWhereUniqueWithoutDepartmentInput[];
    createMany?: Prisma.UserCreateManyDepartmentInputEnvelope;
    set?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    disconnect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    delete?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    connect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    update?: Prisma.UserUpdateWithWhereUniqueWithoutDepartmentInput | Prisma.UserUpdateWithWhereUniqueWithoutDepartmentInput[];
    updateMany?: Prisma.UserUpdateManyWithWhereWithoutDepartmentInput | Prisma.UserUpdateManyWithWhereWithoutDepartmentInput[];
    deleteMany?: Prisma.UserScalarWhereInput | Prisma.UserScalarWhereInput[];
};
export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type UserCreateNestedOneWithoutServiceRequestsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutServiceRequestsInput, Prisma.UserUncheckedCreateWithoutServiceRequestsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutServiceRequestsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutServiceRequestsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutServiceRequestsInput, Prisma.UserUncheckedCreateWithoutServiceRequestsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutServiceRequestsInput;
    upsert?: Prisma.UserUpsertWithoutServiceRequestsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutServiceRequestsInput, Prisma.UserUpdateWithoutServiceRequestsInput>, Prisma.UserUncheckedUpdateWithoutServiceRequestsInput>;
};
export type UserCreateNestedOneWithoutBookingsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutBookingsInput, Prisma.UserUncheckedCreateWithoutBookingsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutBookingsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutBookingsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutBookingsInput, Prisma.UserUncheckedCreateWithoutBookingsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutBookingsInput;
    upsert?: Prisma.UserUpsertWithoutBookingsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutBookingsInput, Prisma.UserUpdateWithoutBookingsInput>, Prisma.UserUncheckedUpdateWithoutBookingsInput>;
};
export type UserCreateNestedOneWithoutApprovalsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutApprovalsInput, Prisma.UserUncheckedCreateWithoutApprovalsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutApprovalsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneWithoutApprovalsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutApprovalsInput, Prisma.UserUncheckedCreateWithoutApprovalsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutApprovalsInput;
    upsert?: Prisma.UserUpsertWithoutApprovalsInput;
    disconnect?: Prisma.UserWhereInput | boolean;
    delete?: Prisma.UserWhereInput | boolean;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutApprovalsInput, Prisma.UserUpdateWithoutApprovalsInput>, Prisma.UserUncheckedUpdateWithoutApprovalsInput>;
};
export type UserCreateNestedOneWithoutAuditEventsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutAuditEventsInput, Prisma.UserUncheckedCreateWithoutAuditEventsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutAuditEventsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneWithoutAuditEventsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutAuditEventsInput, Prisma.UserUncheckedCreateWithoutAuditEventsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutAuditEventsInput;
    upsert?: Prisma.UserUpsertWithoutAuditEventsInput;
    disconnect?: Prisma.UserWhereInput | boolean;
    delete?: Prisma.UserWhereInput | boolean;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutAuditEventsInput, Prisma.UserUpdateWithoutAuditEventsInput>, Prisma.UserUncheckedUpdateWithoutAuditEventsInput>;
};
export type UserCreateWithoutInstitutionInput = {
    id?: string;
    name: string;
    email: string;
    role: $Enums.UserRole;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    department?: Prisma.DepartmentCreateNestedOneWithoutUsersInput;
    serviceRequests?: Prisma.ServiceRequestCreateNestedManyWithoutUserInput;
    bookings?: Prisma.BookingCreateNestedManyWithoutUserInput;
    approvals?: Prisma.ApprovalCreateNestedManyWithoutApproverInput;
    auditEvents?: Prisma.AuditEventCreateNestedManyWithoutActorInput;
};
export type UserUncheckedCreateWithoutInstitutionInput = {
    id?: string;
    departmentId?: string | null;
    name: string;
    email: string;
    role: $Enums.UserRole;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    serviceRequests?: Prisma.ServiceRequestUncheckedCreateNestedManyWithoutUserInput;
    bookings?: Prisma.BookingUncheckedCreateNestedManyWithoutUserInput;
    approvals?: Prisma.ApprovalUncheckedCreateNestedManyWithoutApproverInput;
    auditEvents?: Prisma.AuditEventUncheckedCreateNestedManyWithoutActorInput;
};
export type UserCreateOrConnectWithoutInstitutionInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutInstitutionInput, Prisma.UserUncheckedCreateWithoutInstitutionInput>;
};
export type UserCreateManyInstitutionInputEnvelope = {
    data: Prisma.UserCreateManyInstitutionInput | Prisma.UserCreateManyInstitutionInput[];
    skipDuplicates?: boolean;
};
export type UserUpsertWithWhereUniqueWithoutInstitutionInput = {
    where: Prisma.UserWhereUniqueInput;
    update: Prisma.XOR<Prisma.UserUpdateWithoutInstitutionInput, Prisma.UserUncheckedUpdateWithoutInstitutionInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutInstitutionInput, Prisma.UserUncheckedCreateWithoutInstitutionInput>;
};
export type UserUpdateWithWhereUniqueWithoutInstitutionInput = {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutInstitutionInput, Prisma.UserUncheckedUpdateWithoutInstitutionInput>;
};
export type UserUpdateManyWithWhereWithoutInstitutionInput = {
    where: Prisma.UserScalarWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyWithoutInstitutionInput>;
};
export type UserScalarWhereInput = {
    AND?: Prisma.UserScalarWhereInput | Prisma.UserScalarWhereInput[];
    OR?: Prisma.UserScalarWhereInput[];
    NOT?: Prisma.UserScalarWhereInput | Prisma.UserScalarWhereInput[];
    id?: Prisma.StringFilter<"User"> | string;
    institutionId?: Prisma.StringFilter<"User"> | string;
    departmentId?: Prisma.StringNullableFilter<"User"> | string | null;
    name?: Prisma.StringFilter<"User"> | string;
    email?: Prisma.StringFilter<"User"> | string;
    role?: Prisma.EnumUserRoleFilter<"User"> | $Enums.UserRole;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string;
};
export type UserCreateWithoutDepartmentInput = {
    id?: string;
    name: string;
    email: string;
    role: $Enums.UserRole;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    institution: Prisma.InstitutionCreateNestedOneWithoutUsersInput;
    serviceRequests?: Prisma.ServiceRequestCreateNestedManyWithoutUserInput;
    bookings?: Prisma.BookingCreateNestedManyWithoutUserInput;
    approvals?: Prisma.ApprovalCreateNestedManyWithoutApproverInput;
    auditEvents?: Prisma.AuditEventCreateNestedManyWithoutActorInput;
};
export type UserUncheckedCreateWithoutDepartmentInput = {
    id?: string;
    institutionId: string;
    name: string;
    email: string;
    role: $Enums.UserRole;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    serviceRequests?: Prisma.ServiceRequestUncheckedCreateNestedManyWithoutUserInput;
    bookings?: Prisma.BookingUncheckedCreateNestedManyWithoutUserInput;
    approvals?: Prisma.ApprovalUncheckedCreateNestedManyWithoutApproverInput;
    auditEvents?: Prisma.AuditEventUncheckedCreateNestedManyWithoutActorInput;
};
export type UserCreateOrConnectWithoutDepartmentInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutDepartmentInput, Prisma.UserUncheckedCreateWithoutDepartmentInput>;
};
export type UserCreateManyDepartmentInputEnvelope = {
    data: Prisma.UserCreateManyDepartmentInput | Prisma.UserCreateManyDepartmentInput[];
    skipDuplicates?: boolean;
};
export type UserUpsertWithWhereUniqueWithoutDepartmentInput = {
    where: Prisma.UserWhereUniqueInput;
    update: Prisma.XOR<Prisma.UserUpdateWithoutDepartmentInput, Prisma.UserUncheckedUpdateWithoutDepartmentInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutDepartmentInput, Prisma.UserUncheckedCreateWithoutDepartmentInput>;
};
export type UserUpdateWithWhereUniqueWithoutDepartmentInput = {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutDepartmentInput, Prisma.UserUncheckedUpdateWithoutDepartmentInput>;
};
export type UserUpdateManyWithWhereWithoutDepartmentInput = {
    where: Prisma.UserScalarWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyWithoutDepartmentInput>;
};
export type UserCreateWithoutServiceRequestsInput = {
    id?: string;
    name: string;
    email: string;
    role: $Enums.UserRole;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    institution: Prisma.InstitutionCreateNestedOneWithoutUsersInput;
    department?: Prisma.DepartmentCreateNestedOneWithoutUsersInput;
    bookings?: Prisma.BookingCreateNestedManyWithoutUserInput;
    approvals?: Prisma.ApprovalCreateNestedManyWithoutApproverInput;
    auditEvents?: Prisma.AuditEventCreateNestedManyWithoutActorInput;
};
export type UserUncheckedCreateWithoutServiceRequestsInput = {
    id?: string;
    institutionId: string;
    departmentId?: string | null;
    name: string;
    email: string;
    role: $Enums.UserRole;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    bookings?: Prisma.BookingUncheckedCreateNestedManyWithoutUserInput;
    approvals?: Prisma.ApprovalUncheckedCreateNestedManyWithoutApproverInput;
    auditEvents?: Prisma.AuditEventUncheckedCreateNestedManyWithoutActorInput;
};
export type UserCreateOrConnectWithoutServiceRequestsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutServiceRequestsInput, Prisma.UserUncheckedCreateWithoutServiceRequestsInput>;
};
export type UserUpsertWithoutServiceRequestsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutServiceRequestsInput, Prisma.UserUncheckedUpdateWithoutServiceRequestsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutServiceRequestsInput, Prisma.UserUncheckedCreateWithoutServiceRequestsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutServiceRequestsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutServiceRequestsInput, Prisma.UserUncheckedUpdateWithoutServiceRequestsInput>;
};
export type UserUpdateWithoutServiceRequestsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    institution?: Prisma.InstitutionUpdateOneRequiredWithoutUsersNestedInput;
    department?: Prisma.DepartmentUpdateOneWithoutUsersNestedInput;
    bookings?: Prisma.BookingUpdateManyWithoutUserNestedInput;
    approvals?: Prisma.ApprovalUpdateManyWithoutApproverNestedInput;
    auditEvents?: Prisma.AuditEventUpdateManyWithoutActorNestedInput;
};
export type UserUncheckedUpdateWithoutServiceRequestsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    institutionId?: Prisma.StringFieldUpdateOperationsInput | string;
    departmentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    bookings?: Prisma.BookingUncheckedUpdateManyWithoutUserNestedInput;
    approvals?: Prisma.ApprovalUncheckedUpdateManyWithoutApproverNestedInput;
    auditEvents?: Prisma.AuditEventUncheckedUpdateManyWithoutActorNestedInput;
};
export type UserCreateWithoutBookingsInput = {
    id?: string;
    name: string;
    email: string;
    role: $Enums.UserRole;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    institution: Prisma.InstitutionCreateNestedOneWithoutUsersInput;
    department?: Prisma.DepartmentCreateNestedOneWithoutUsersInput;
    serviceRequests?: Prisma.ServiceRequestCreateNestedManyWithoutUserInput;
    approvals?: Prisma.ApprovalCreateNestedManyWithoutApproverInput;
    auditEvents?: Prisma.AuditEventCreateNestedManyWithoutActorInput;
};
export type UserUncheckedCreateWithoutBookingsInput = {
    id?: string;
    institutionId: string;
    departmentId?: string | null;
    name: string;
    email: string;
    role: $Enums.UserRole;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    serviceRequests?: Prisma.ServiceRequestUncheckedCreateNestedManyWithoutUserInput;
    approvals?: Prisma.ApprovalUncheckedCreateNestedManyWithoutApproverInput;
    auditEvents?: Prisma.AuditEventUncheckedCreateNestedManyWithoutActorInput;
};
export type UserCreateOrConnectWithoutBookingsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutBookingsInput, Prisma.UserUncheckedCreateWithoutBookingsInput>;
};
export type UserUpsertWithoutBookingsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutBookingsInput, Prisma.UserUncheckedUpdateWithoutBookingsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutBookingsInput, Prisma.UserUncheckedCreateWithoutBookingsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutBookingsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutBookingsInput, Prisma.UserUncheckedUpdateWithoutBookingsInput>;
};
export type UserUpdateWithoutBookingsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    institution?: Prisma.InstitutionUpdateOneRequiredWithoutUsersNestedInput;
    department?: Prisma.DepartmentUpdateOneWithoutUsersNestedInput;
    serviceRequests?: Prisma.ServiceRequestUpdateManyWithoutUserNestedInput;
    approvals?: Prisma.ApprovalUpdateManyWithoutApproverNestedInput;
    auditEvents?: Prisma.AuditEventUpdateManyWithoutActorNestedInput;
};
export type UserUncheckedUpdateWithoutBookingsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    institutionId?: Prisma.StringFieldUpdateOperationsInput | string;
    departmentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    serviceRequests?: Prisma.ServiceRequestUncheckedUpdateManyWithoutUserNestedInput;
    approvals?: Prisma.ApprovalUncheckedUpdateManyWithoutApproverNestedInput;
    auditEvents?: Prisma.AuditEventUncheckedUpdateManyWithoutActorNestedInput;
};
export type UserCreateWithoutApprovalsInput = {
    id?: string;
    name: string;
    email: string;
    role: $Enums.UserRole;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    institution: Prisma.InstitutionCreateNestedOneWithoutUsersInput;
    department?: Prisma.DepartmentCreateNestedOneWithoutUsersInput;
    serviceRequests?: Prisma.ServiceRequestCreateNestedManyWithoutUserInput;
    bookings?: Prisma.BookingCreateNestedManyWithoutUserInput;
    auditEvents?: Prisma.AuditEventCreateNestedManyWithoutActorInput;
};
export type UserUncheckedCreateWithoutApprovalsInput = {
    id?: string;
    institutionId: string;
    departmentId?: string | null;
    name: string;
    email: string;
    role: $Enums.UserRole;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    serviceRequests?: Prisma.ServiceRequestUncheckedCreateNestedManyWithoutUserInput;
    bookings?: Prisma.BookingUncheckedCreateNestedManyWithoutUserInput;
    auditEvents?: Prisma.AuditEventUncheckedCreateNestedManyWithoutActorInput;
};
export type UserCreateOrConnectWithoutApprovalsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutApprovalsInput, Prisma.UserUncheckedCreateWithoutApprovalsInput>;
};
export type UserUpsertWithoutApprovalsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutApprovalsInput, Prisma.UserUncheckedUpdateWithoutApprovalsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutApprovalsInput, Prisma.UserUncheckedCreateWithoutApprovalsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutApprovalsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutApprovalsInput, Prisma.UserUncheckedUpdateWithoutApprovalsInput>;
};
export type UserUpdateWithoutApprovalsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    institution?: Prisma.InstitutionUpdateOneRequiredWithoutUsersNestedInput;
    department?: Prisma.DepartmentUpdateOneWithoutUsersNestedInput;
    serviceRequests?: Prisma.ServiceRequestUpdateManyWithoutUserNestedInput;
    bookings?: Prisma.BookingUpdateManyWithoutUserNestedInput;
    auditEvents?: Prisma.AuditEventUpdateManyWithoutActorNestedInput;
};
export type UserUncheckedUpdateWithoutApprovalsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    institutionId?: Prisma.StringFieldUpdateOperationsInput | string;
    departmentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    serviceRequests?: Prisma.ServiceRequestUncheckedUpdateManyWithoutUserNestedInput;
    bookings?: Prisma.BookingUncheckedUpdateManyWithoutUserNestedInput;
    auditEvents?: Prisma.AuditEventUncheckedUpdateManyWithoutActorNestedInput;
};
export type UserCreateWithoutAuditEventsInput = {
    id?: string;
    name: string;
    email: string;
    role: $Enums.UserRole;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    institution: Prisma.InstitutionCreateNestedOneWithoutUsersInput;
    department?: Prisma.DepartmentCreateNestedOneWithoutUsersInput;
    serviceRequests?: Prisma.ServiceRequestCreateNestedManyWithoutUserInput;
    bookings?: Prisma.BookingCreateNestedManyWithoutUserInput;
    approvals?: Prisma.ApprovalCreateNestedManyWithoutApproverInput;
};
export type UserUncheckedCreateWithoutAuditEventsInput = {
    id?: string;
    institutionId: string;
    departmentId?: string | null;
    name: string;
    email: string;
    role: $Enums.UserRole;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    serviceRequests?: Prisma.ServiceRequestUncheckedCreateNestedManyWithoutUserInput;
    bookings?: Prisma.BookingUncheckedCreateNestedManyWithoutUserInput;
    approvals?: Prisma.ApprovalUncheckedCreateNestedManyWithoutApproverInput;
};
export type UserCreateOrConnectWithoutAuditEventsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutAuditEventsInput, Prisma.UserUncheckedCreateWithoutAuditEventsInput>;
};
export type UserUpsertWithoutAuditEventsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutAuditEventsInput, Prisma.UserUncheckedUpdateWithoutAuditEventsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutAuditEventsInput, Prisma.UserUncheckedCreateWithoutAuditEventsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutAuditEventsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutAuditEventsInput, Prisma.UserUncheckedUpdateWithoutAuditEventsInput>;
};
export type UserUpdateWithoutAuditEventsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    institution?: Prisma.InstitutionUpdateOneRequiredWithoutUsersNestedInput;
    department?: Prisma.DepartmentUpdateOneWithoutUsersNestedInput;
    serviceRequests?: Prisma.ServiceRequestUpdateManyWithoutUserNestedInput;
    bookings?: Prisma.BookingUpdateManyWithoutUserNestedInput;
    approvals?: Prisma.ApprovalUpdateManyWithoutApproverNestedInput;
};
export type UserUncheckedUpdateWithoutAuditEventsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    institutionId?: Prisma.StringFieldUpdateOperationsInput | string;
    departmentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    serviceRequests?: Prisma.ServiceRequestUncheckedUpdateManyWithoutUserNestedInput;
    bookings?: Prisma.BookingUncheckedUpdateManyWithoutUserNestedInput;
    approvals?: Prisma.ApprovalUncheckedUpdateManyWithoutApproverNestedInput;
};
export type UserCreateManyInstitutionInput = {
    id?: string;
    departmentId?: string | null;
    name: string;
    email: string;
    role: $Enums.UserRole;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserUpdateWithoutInstitutionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    department?: Prisma.DepartmentUpdateOneWithoutUsersNestedInput;
    serviceRequests?: Prisma.ServiceRequestUpdateManyWithoutUserNestedInput;
    bookings?: Prisma.BookingUpdateManyWithoutUserNestedInput;
    approvals?: Prisma.ApprovalUpdateManyWithoutApproverNestedInput;
    auditEvents?: Prisma.AuditEventUpdateManyWithoutActorNestedInput;
};
export type UserUncheckedUpdateWithoutInstitutionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    departmentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    serviceRequests?: Prisma.ServiceRequestUncheckedUpdateManyWithoutUserNestedInput;
    bookings?: Prisma.BookingUncheckedUpdateManyWithoutUserNestedInput;
    approvals?: Prisma.ApprovalUncheckedUpdateManyWithoutApproverNestedInput;
    auditEvents?: Prisma.AuditEventUncheckedUpdateManyWithoutActorNestedInput;
};
export type UserUncheckedUpdateManyWithoutInstitutionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    departmentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserCreateManyDepartmentInput = {
    id?: string;
    institutionId: string;
    name: string;
    email: string;
    role: $Enums.UserRole;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserUpdateWithoutDepartmentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    institution?: Prisma.InstitutionUpdateOneRequiredWithoutUsersNestedInput;
    serviceRequests?: Prisma.ServiceRequestUpdateManyWithoutUserNestedInput;
    bookings?: Prisma.BookingUpdateManyWithoutUserNestedInput;
    approvals?: Prisma.ApprovalUpdateManyWithoutApproverNestedInput;
    auditEvents?: Prisma.AuditEventUpdateManyWithoutActorNestedInput;
};
export type UserUncheckedUpdateWithoutDepartmentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    institutionId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    serviceRequests?: Prisma.ServiceRequestUncheckedUpdateManyWithoutUserNestedInput;
    bookings?: Prisma.BookingUncheckedUpdateManyWithoutUserNestedInput;
    approvals?: Prisma.ApprovalUncheckedUpdateManyWithoutApproverNestedInput;
    auditEvents?: Prisma.AuditEventUncheckedUpdateManyWithoutActorNestedInput;
};
export type UserUncheckedUpdateManyWithoutDepartmentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    institutionId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserCountOutputType = {
    serviceRequests: number;
    bookings: number;
    approvals: number;
    auditEvents: number;
};
export type UserCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    serviceRequests?: boolean | UserCountOutputTypeCountServiceRequestsArgs;
    bookings?: boolean | UserCountOutputTypeCountBookingsArgs;
    approvals?: boolean | UserCountOutputTypeCountApprovalsArgs;
    auditEvents?: boolean | UserCountOutputTypeCountAuditEventsArgs;
};
export type UserCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserCountOutputTypeSelect<ExtArgs> | null;
};
export type UserCountOutputTypeCountServiceRequestsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ServiceRequestWhereInput;
};
export type UserCountOutputTypeCountBookingsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BookingWhereInput;
};
export type UserCountOutputTypeCountApprovalsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ApprovalWhereInput;
};
export type UserCountOutputTypeCountAuditEventsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AuditEventWhereInput;
};
export type UserSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    institutionId?: boolean;
    departmentId?: boolean;
    name?: boolean;
    email?: boolean;
    role?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    institution?: boolean | Prisma.InstitutionDefaultArgs<ExtArgs>;
    department?: boolean | Prisma.User$departmentArgs<ExtArgs>;
    serviceRequests?: boolean | Prisma.User$serviceRequestsArgs<ExtArgs>;
    bookings?: boolean | Prisma.User$bookingsArgs<ExtArgs>;
    approvals?: boolean | Prisma.User$approvalsArgs<ExtArgs>;
    auditEvents?: boolean | Prisma.User$auditEventsArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["user"]>;
export type UserSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    institutionId?: boolean;
    departmentId?: boolean;
    name?: boolean;
    email?: boolean;
    role?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    institution?: boolean | Prisma.InstitutionDefaultArgs<ExtArgs>;
    department?: boolean | Prisma.User$departmentArgs<ExtArgs>;
}, ExtArgs["result"]["user"]>;
export type UserSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    institutionId?: boolean;
    departmentId?: boolean;
    name?: boolean;
    email?: boolean;
    role?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    institution?: boolean | Prisma.InstitutionDefaultArgs<ExtArgs>;
    department?: boolean | Prisma.User$departmentArgs<ExtArgs>;
}, ExtArgs["result"]["user"]>;
export type UserSelectScalar = {
    id?: boolean;
    institutionId?: boolean;
    departmentId?: boolean;
    name?: boolean;
    email?: boolean;
    role?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type UserOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "institutionId" | "departmentId" | "name" | "email" | "role" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>;
export type UserInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    institution?: boolean | Prisma.InstitutionDefaultArgs<ExtArgs>;
    department?: boolean | Prisma.User$departmentArgs<ExtArgs>;
    serviceRequests?: boolean | Prisma.User$serviceRequestsArgs<ExtArgs>;
    bookings?: boolean | Prisma.User$bookingsArgs<ExtArgs>;
    approvals?: boolean | Prisma.User$approvalsArgs<ExtArgs>;
    auditEvents?: boolean | Prisma.User$auditEventsArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
};
export type UserIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    institution?: boolean | Prisma.InstitutionDefaultArgs<ExtArgs>;
    department?: boolean | Prisma.User$departmentArgs<ExtArgs>;
};
export type UserIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    institution?: boolean | Prisma.InstitutionDefaultArgs<ExtArgs>;
    department?: boolean | Prisma.User$departmentArgs<ExtArgs>;
};
export type $UserPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "User";
    objects: {
        institution: Prisma.$InstitutionPayload<ExtArgs>;
        department: Prisma.$DepartmentPayload<ExtArgs> | null;
        serviceRequests: Prisma.$ServiceRequestPayload<ExtArgs>[];
        bookings: Prisma.$BookingPayload<ExtArgs>[];
        approvals: Prisma.$ApprovalPayload<ExtArgs>[];
        auditEvents: Prisma.$AuditEventPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        institutionId: string;
        departmentId: string | null;
        name: string;
        email: string;
        role: $Enums.UserRole;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["user"]>;
    composites: {};
};
export type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UserPayload, S>;
export type UserCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserCountAggregateInputType | true;
};
export interface UserDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['User'];
        meta: {
            name: 'User';
        };
    };
    findUnique<T extends UserFindUniqueArgs>(args: Prisma.SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends UserFindFirstArgs>(args?: Prisma.SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends UserFindManyArgs>(args?: Prisma.SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends UserCreateArgs>(args: Prisma.SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends UserCreateManyArgs>(args?: Prisma.SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends UserDeleteArgs>(args: Prisma.SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends UserUpdateArgs>(args: Prisma.SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends UserDeleteManyArgs>(args?: Prisma.SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends UserUpdateManyArgs>(args: Prisma.SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends UserUpsertArgs>(args: Prisma.SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends UserCountArgs>(args?: Prisma.Subset<T, UserCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UserCountAggregateOutputType> : number>;
    aggregate<T extends UserAggregateArgs>(args: Prisma.Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>;
    groupBy<T extends UserGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: UserGroupByArgs['orderBy'];
    } : {
        orderBy?: UserGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: UserFieldRefs;
}
export interface Prisma__UserClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    institution<T extends Prisma.InstitutionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.InstitutionDefaultArgs<ExtArgs>>): Prisma.Prisma__InstitutionClient<runtime.Types.Result.GetResult<Prisma.$InstitutionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    department<T extends Prisma.User$departmentArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$departmentArgs<ExtArgs>>): Prisma.Prisma__DepartmentClient<runtime.Types.Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    serviceRequests<T extends Prisma.User$serviceRequestsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$serviceRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ServiceRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    bookings<T extends Prisma.User$bookingsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$bookingsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    approvals<T extends Prisma.User$approvalsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$approvalsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ApprovalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    auditEvents<T extends Prisma.User$auditEventsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$auditEventsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AuditEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface UserFieldRefs {
    readonly id: Prisma.FieldRef<"User", 'String'>;
    readonly institutionId: Prisma.FieldRef<"User", 'String'>;
    readonly departmentId: Prisma.FieldRef<"User", 'String'>;
    readonly name: Prisma.FieldRef<"User", 'String'>;
    readonly email: Prisma.FieldRef<"User", 'String'>;
    readonly role: Prisma.FieldRef<"User", 'UserRole'>;
    readonly createdAt: Prisma.FieldRef<"User", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"User", 'DateTime'>;
}
export type UserFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
};
export type UserFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
};
export type UserFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
export type UserFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
export type UserFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
export type UserCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
};
export type UserCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[];
    skipDuplicates?: boolean;
};
export type UserCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.UserIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type UserUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
    where: Prisma.UserWhereUniqueInput;
};
export type UserUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>;
    where?: Prisma.UserWhereInput;
    limit?: number;
};
export type UserUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>;
    where?: Prisma.UserWhereInput;
    limit?: number;
    include?: Prisma.UserIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type UserUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
};
export type UserDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
};
export type UserDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    limit?: number;
};
export type User$departmentArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DepartmentSelect<ExtArgs> | null;
    omit?: Prisma.DepartmentOmit<ExtArgs> | null;
    include?: Prisma.DepartmentInclude<ExtArgs> | null;
    where?: Prisma.DepartmentWhereInput;
};
export type User$serviceRequestsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ServiceRequestSelect<ExtArgs> | null;
    omit?: Prisma.ServiceRequestOmit<ExtArgs> | null;
    include?: Prisma.ServiceRequestInclude<ExtArgs> | null;
    where?: Prisma.ServiceRequestWhereInput;
    orderBy?: Prisma.ServiceRequestOrderByWithRelationInput | Prisma.ServiceRequestOrderByWithRelationInput[];
    cursor?: Prisma.ServiceRequestWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ServiceRequestScalarFieldEnum | Prisma.ServiceRequestScalarFieldEnum[];
};
export type User$bookingsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingSelect<ExtArgs> | null;
    omit?: Prisma.BookingOmit<ExtArgs> | null;
    include?: Prisma.BookingInclude<ExtArgs> | null;
    where?: Prisma.BookingWhereInput;
    orderBy?: Prisma.BookingOrderByWithRelationInput | Prisma.BookingOrderByWithRelationInput[];
    cursor?: Prisma.BookingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BookingScalarFieldEnum | Prisma.BookingScalarFieldEnum[];
};
export type User$approvalsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ApprovalSelect<ExtArgs> | null;
    omit?: Prisma.ApprovalOmit<ExtArgs> | null;
    include?: Prisma.ApprovalInclude<ExtArgs> | null;
    where?: Prisma.ApprovalWhereInput;
    orderBy?: Prisma.ApprovalOrderByWithRelationInput | Prisma.ApprovalOrderByWithRelationInput[];
    cursor?: Prisma.ApprovalWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ApprovalScalarFieldEnum | Prisma.ApprovalScalarFieldEnum[];
};
export type User$auditEventsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditEventSelect<ExtArgs> | null;
    omit?: Prisma.AuditEventOmit<ExtArgs> | null;
    include?: Prisma.AuditEventInclude<ExtArgs> | null;
    where?: Prisma.AuditEventWhereInput;
    orderBy?: Prisma.AuditEventOrderByWithRelationInput | Prisma.AuditEventOrderByWithRelationInput[];
    cursor?: Prisma.AuditEventWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AuditEventScalarFieldEnum | Prisma.AuditEventScalarFieldEnum[];
};
export type UserDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
};
export {};
