import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace.js";
export type InstitutionModel = runtime.Types.Result.DefaultSelection<Prisma.$InstitutionPayload>;
export type AggregateInstitution = {
    _count: InstitutionCountAggregateOutputType | null;
    _min: InstitutionMinAggregateOutputType | null;
    _max: InstitutionMaxAggregateOutputType | null;
};
export type InstitutionMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    code: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type InstitutionMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    code: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type InstitutionCountAggregateOutputType = {
    id: number;
    name: number;
    code: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type InstitutionMinAggregateInputType = {
    id?: true;
    name?: true;
    code?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type InstitutionMaxAggregateInputType = {
    id?: true;
    name?: true;
    code?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type InstitutionCountAggregateInputType = {
    id?: true;
    name?: true;
    code?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type InstitutionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InstitutionWhereInput;
    orderBy?: Prisma.InstitutionOrderByWithRelationInput | Prisma.InstitutionOrderByWithRelationInput[];
    cursor?: Prisma.InstitutionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | InstitutionCountAggregateInputType;
    _min?: InstitutionMinAggregateInputType;
    _max?: InstitutionMaxAggregateInputType;
};
export type GetInstitutionAggregateType<T extends InstitutionAggregateArgs> = {
    [P in keyof T & keyof AggregateInstitution]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateInstitution[P]> : Prisma.GetScalarType<T[P], AggregateInstitution[P]>;
};
export type InstitutionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InstitutionWhereInput;
    orderBy?: Prisma.InstitutionOrderByWithAggregationInput | Prisma.InstitutionOrderByWithAggregationInput[];
    by: Prisma.InstitutionScalarFieldEnum[] | Prisma.InstitutionScalarFieldEnum;
    having?: Prisma.InstitutionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: InstitutionCountAggregateInputType | true;
    _min?: InstitutionMinAggregateInputType;
    _max?: InstitutionMaxAggregateInputType;
};
export type InstitutionGroupByOutputType = {
    id: string;
    name: string;
    code: string;
    createdAt: Date;
    updatedAt: Date;
    _count: InstitutionCountAggregateOutputType | null;
    _min: InstitutionMinAggregateOutputType | null;
    _max: InstitutionMaxAggregateOutputType | null;
};
type GetInstitutionGroupByPayload<T extends InstitutionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<InstitutionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof InstitutionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], InstitutionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], InstitutionGroupByOutputType[P]>;
}>>;
export type InstitutionWhereInput = {
    AND?: Prisma.InstitutionWhereInput | Prisma.InstitutionWhereInput[];
    OR?: Prisma.InstitutionWhereInput[];
    NOT?: Prisma.InstitutionWhereInput | Prisma.InstitutionWhereInput[];
    id?: Prisma.StringFilter<"Institution"> | string;
    name?: Prisma.StringFilter<"Institution"> | string;
    code?: Prisma.StringFilter<"Institution"> | string;
    createdAt?: Prisma.DateTimeFilter<"Institution"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Institution"> | Date | string;
    departments?: Prisma.DepartmentListRelationFilter;
    users?: Prisma.UserListRelationFilter;
    resources?: Prisma.ResourceListRelationFilter;
    serviceRequests?: Prisma.ServiceRequestListRelationFilter;
    bookings?: Prisma.BookingListRelationFilter;
    approvals?: Prisma.ApprovalListRelationFilter;
    auditEvents?: Prisma.AuditEventListRelationFilter;
};
export type InstitutionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    departments?: Prisma.DepartmentOrderByRelationAggregateInput;
    users?: Prisma.UserOrderByRelationAggregateInput;
    resources?: Prisma.ResourceOrderByRelationAggregateInput;
    serviceRequests?: Prisma.ServiceRequestOrderByRelationAggregateInput;
    bookings?: Prisma.BookingOrderByRelationAggregateInput;
    approvals?: Prisma.ApprovalOrderByRelationAggregateInput;
    auditEvents?: Prisma.AuditEventOrderByRelationAggregateInput;
};
export type InstitutionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    code?: string;
    AND?: Prisma.InstitutionWhereInput | Prisma.InstitutionWhereInput[];
    OR?: Prisma.InstitutionWhereInput[];
    NOT?: Prisma.InstitutionWhereInput | Prisma.InstitutionWhereInput[];
    name?: Prisma.StringFilter<"Institution"> | string;
    createdAt?: Prisma.DateTimeFilter<"Institution"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Institution"> | Date | string;
    departments?: Prisma.DepartmentListRelationFilter;
    users?: Prisma.UserListRelationFilter;
    resources?: Prisma.ResourceListRelationFilter;
    serviceRequests?: Prisma.ServiceRequestListRelationFilter;
    bookings?: Prisma.BookingListRelationFilter;
    approvals?: Prisma.ApprovalListRelationFilter;
    auditEvents?: Prisma.AuditEventListRelationFilter;
}, "id" | "code">;
export type InstitutionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.InstitutionCountOrderByAggregateInput;
    _max?: Prisma.InstitutionMaxOrderByAggregateInput;
    _min?: Prisma.InstitutionMinOrderByAggregateInput;
};
export type InstitutionScalarWhereWithAggregatesInput = {
    AND?: Prisma.InstitutionScalarWhereWithAggregatesInput | Prisma.InstitutionScalarWhereWithAggregatesInput[];
    OR?: Prisma.InstitutionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.InstitutionScalarWhereWithAggregatesInput | Prisma.InstitutionScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Institution"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Institution"> | string;
    code?: Prisma.StringWithAggregatesFilter<"Institution"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Institution"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Institution"> | Date | string;
};
export type InstitutionCreateInput = {
    id?: string;
    name: string;
    code: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    departments?: Prisma.DepartmentCreateNestedManyWithoutInstitutionInput;
    users?: Prisma.UserCreateNestedManyWithoutInstitutionInput;
    resources?: Prisma.ResourceCreateNestedManyWithoutInstitutionInput;
    serviceRequests?: Prisma.ServiceRequestCreateNestedManyWithoutInstitutionInput;
    bookings?: Prisma.BookingCreateNestedManyWithoutInstitutionInput;
    approvals?: Prisma.ApprovalCreateNestedManyWithoutInstitutionInput;
    auditEvents?: Prisma.AuditEventCreateNestedManyWithoutInstitutionInput;
};
export type InstitutionUncheckedCreateInput = {
    id?: string;
    name: string;
    code: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    departments?: Prisma.DepartmentUncheckedCreateNestedManyWithoutInstitutionInput;
    users?: Prisma.UserUncheckedCreateNestedManyWithoutInstitutionInput;
    resources?: Prisma.ResourceUncheckedCreateNestedManyWithoutInstitutionInput;
    serviceRequests?: Prisma.ServiceRequestUncheckedCreateNestedManyWithoutInstitutionInput;
    bookings?: Prisma.BookingUncheckedCreateNestedManyWithoutInstitutionInput;
    approvals?: Prisma.ApprovalUncheckedCreateNestedManyWithoutInstitutionInput;
    auditEvents?: Prisma.AuditEventUncheckedCreateNestedManyWithoutInstitutionInput;
};
export type InstitutionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    departments?: Prisma.DepartmentUpdateManyWithoutInstitutionNestedInput;
    users?: Prisma.UserUpdateManyWithoutInstitutionNestedInput;
    resources?: Prisma.ResourceUpdateManyWithoutInstitutionNestedInput;
    serviceRequests?: Prisma.ServiceRequestUpdateManyWithoutInstitutionNestedInput;
    bookings?: Prisma.BookingUpdateManyWithoutInstitutionNestedInput;
    approvals?: Prisma.ApprovalUpdateManyWithoutInstitutionNestedInput;
    auditEvents?: Prisma.AuditEventUpdateManyWithoutInstitutionNestedInput;
};
export type InstitutionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    departments?: Prisma.DepartmentUncheckedUpdateManyWithoutInstitutionNestedInput;
    users?: Prisma.UserUncheckedUpdateManyWithoutInstitutionNestedInput;
    resources?: Prisma.ResourceUncheckedUpdateManyWithoutInstitutionNestedInput;
    serviceRequests?: Prisma.ServiceRequestUncheckedUpdateManyWithoutInstitutionNestedInput;
    bookings?: Prisma.BookingUncheckedUpdateManyWithoutInstitutionNestedInput;
    approvals?: Prisma.ApprovalUncheckedUpdateManyWithoutInstitutionNestedInput;
    auditEvents?: Prisma.AuditEventUncheckedUpdateManyWithoutInstitutionNestedInput;
};
export type InstitutionCreateManyInput = {
    id?: string;
    name: string;
    code: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type InstitutionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InstitutionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InstitutionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type InstitutionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type InstitutionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type InstitutionScalarRelationFilter = {
    is?: Prisma.InstitutionWhereInput;
    isNot?: Prisma.InstitutionWhereInput;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type InstitutionCreateNestedOneWithoutDepartmentsInput = {
    create?: Prisma.XOR<Prisma.InstitutionCreateWithoutDepartmentsInput, Prisma.InstitutionUncheckedCreateWithoutDepartmentsInput>;
    connectOrCreate?: Prisma.InstitutionCreateOrConnectWithoutDepartmentsInput;
    connect?: Prisma.InstitutionWhereUniqueInput;
};
export type InstitutionUpdateOneRequiredWithoutDepartmentsNestedInput = {
    create?: Prisma.XOR<Prisma.InstitutionCreateWithoutDepartmentsInput, Prisma.InstitutionUncheckedCreateWithoutDepartmentsInput>;
    connectOrCreate?: Prisma.InstitutionCreateOrConnectWithoutDepartmentsInput;
    upsert?: Prisma.InstitutionUpsertWithoutDepartmentsInput;
    connect?: Prisma.InstitutionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.InstitutionUpdateToOneWithWhereWithoutDepartmentsInput, Prisma.InstitutionUpdateWithoutDepartmentsInput>, Prisma.InstitutionUncheckedUpdateWithoutDepartmentsInput>;
};
export type InstitutionCreateNestedOneWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.InstitutionCreateWithoutUsersInput, Prisma.InstitutionUncheckedCreateWithoutUsersInput>;
    connectOrCreate?: Prisma.InstitutionCreateOrConnectWithoutUsersInput;
    connect?: Prisma.InstitutionWhereUniqueInput;
};
export type InstitutionUpdateOneRequiredWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.InstitutionCreateWithoutUsersInput, Prisma.InstitutionUncheckedCreateWithoutUsersInput>;
    connectOrCreate?: Prisma.InstitutionCreateOrConnectWithoutUsersInput;
    upsert?: Prisma.InstitutionUpsertWithoutUsersInput;
    connect?: Prisma.InstitutionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.InstitutionUpdateToOneWithWhereWithoutUsersInput, Prisma.InstitutionUpdateWithoutUsersInput>, Prisma.InstitutionUncheckedUpdateWithoutUsersInput>;
};
export type InstitutionCreateNestedOneWithoutResourcesInput = {
    create?: Prisma.XOR<Prisma.InstitutionCreateWithoutResourcesInput, Prisma.InstitutionUncheckedCreateWithoutResourcesInput>;
    connectOrCreate?: Prisma.InstitutionCreateOrConnectWithoutResourcesInput;
    connect?: Prisma.InstitutionWhereUniqueInput;
};
export type InstitutionUpdateOneRequiredWithoutResourcesNestedInput = {
    create?: Prisma.XOR<Prisma.InstitutionCreateWithoutResourcesInput, Prisma.InstitutionUncheckedCreateWithoutResourcesInput>;
    connectOrCreate?: Prisma.InstitutionCreateOrConnectWithoutResourcesInput;
    upsert?: Prisma.InstitutionUpsertWithoutResourcesInput;
    connect?: Prisma.InstitutionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.InstitutionUpdateToOneWithWhereWithoutResourcesInput, Prisma.InstitutionUpdateWithoutResourcesInput>, Prisma.InstitutionUncheckedUpdateWithoutResourcesInput>;
};
export type InstitutionCreateNestedOneWithoutServiceRequestsInput = {
    create?: Prisma.XOR<Prisma.InstitutionCreateWithoutServiceRequestsInput, Prisma.InstitutionUncheckedCreateWithoutServiceRequestsInput>;
    connectOrCreate?: Prisma.InstitutionCreateOrConnectWithoutServiceRequestsInput;
    connect?: Prisma.InstitutionWhereUniqueInput;
};
export type InstitutionUpdateOneRequiredWithoutServiceRequestsNestedInput = {
    create?: Prisma.XOR<Prisma.InstitutionCreateWithoutServiceRequestsInput, Prisma.InstitutionUncheckedCreateWithoutServiceRequestsInput>;
    connectOrCreate?: Prisma.InstitutionCreateOrConnectWithoutServiceRequestsInput;
    upsert?: Prisma.InstitutionUpsertWithoutServiceRequestsInput;
    connect?: Prisma.InstitutionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.InstitutionUpdateToOneWithWhereWithoutServiceRequestsInput, Prisma.InstitutionUpdateWithoutServiceRequestsInput>, Prisma.InstitutionUncheckedUpdateWithoutServiceRequestsInput>;
};
export type InstitutionCreateNestedOneWithoutBookingsInput = {
    create?: Prisma.XOR<Prisma.InstitutionCreateWithoutBookingsInput, Prisma.InstitutionUncheckedCreateWithoutBookingsInput>;
    connectOrCreate?: Prisma.InstitutionCreateOrConnectWithoutBookingsInput;
    connect?: Prisma.InstitutionWhereUniqueInput;
};
export type InstitutionUpdateOneRequiredWithoutBookingsNestedInput = {
    create?: Prisma.XOR<Prisma.InstitutionCreateWithoutBookingsInput, Prisma.InstitutionUncheckedCreateWithoutBookingsInput>;
    connectOrCreate?: Prisma.InstitutionCreateOrConnectWithoutBookingsInput;
    upsert?: Prisma.InstitutionUpsertWithoutBookingsInput;
    connect?: Prisma.InstitutionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.InstitutionUpdateToOneWithWhereWithoutBookingsInput, Prisma.InstitutionUpdateWithoutBookingsInput>, Prisma.InstitutionUncheckedUpdateWithoutBookingsInput>;
};
export type InstitutionCreateNestedOneWithoutApprovalsInput = {
    create?: Prisma.XOR<Prisma.InstitutionCreateWithoutApprovalsInput, Prisma.InstitutionUncheckedCreateWithoutApprovalsInput>;
    connectOrCreate?: Prisma.InstitutionCreateOrConnectWithoutApprovalsInput;
    connect?: Prisma.InstitutionWhereUniqueInput;
};
export type InstitutionUpdateOneRequiredWithoutApprovalsNestedInput = {
    create?: Prisma.XOR<Prisma.InstitutionCreateWithoutApprovalsInput, Prisma.InstitutionUncheckedCreateWithoutApprovalsInput>;
    connectOrCreate?: Prisma.InstitutionCreateOrConnectWithoutApprovalsInput;
    upsert?: Prisma.InstitutionUpsertWithoutApprovalsInput;
    connect?: Prisma.InstitutionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.InstitutionUpdateToOneWithWhereWithoutApprovalsInput, Prisma.InstitutionUpdateWithoutApprovalsInput>, Prisma.InstitutionUncheckedUpdateWithoutApprovalsInput>;
};
export type InstitutionCreateNestedOneWithoutAuditEventsInput = {
    create?: Prisma.XOR<Prisma.InstitutionCreateWithoutAuditEventsInput, Prisma.InstitutionUncheckedCreateWithoutAuditEventsInput>;
    connectOrCreate?: Prisma.InstitutionCreateOrConnectWithoutAuditEventsInput;
    connect?: Prisma.InstitutionWhereUniqueInput;
};
export type InstitutionUpdateOneRequiredWithoutAuditEventsNestedInput = {
    create?: Prisma.XOR<Prisma.InstitutionCreateWithoutAuditEventsInput, Prisma.InstitutionUncheckedCreateWithoutAuditEventsInput>;
    connectOrCreate?: Prisma.InstitutionCreateOrConnectWithoutAuditEventsInput;
    upsert?: Prisma.InstitutionUpsertWithoutAuditEventsInput;
    connect?: Prisma.InstitutionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.InstitutionUpdateToOneWithWhereWithoutAuditEventsInput, Prisma.InstitutionUpdateWithoutAuditEventsInput>, Prisma.InstitutionUncheckedUpdateWithoutAuditEventsInput>;
};
export type InstitutionCreateWithoutDepartmentsInput = {
    id?: string;
    name: string;
    code: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    users?: Prisma.UserCreateNestedManyWithoutInstitutionInput;
    resources?: Prisma.ResourceCreateNestedManyWithoutInstitutionInput;
    serviceRequests?: Prisma.ServiceRequestCreateNestedManyWithoutInstitutionInput;
    bookings?: Prisma.BookingCreateNestedManyWithoutInstitutionInput;
    approvals?: Prisma.ApprovalCreateNestedManyWithoutInstitutionInput;
    auditEvents?: Prisma.AuditEventCreateNestedManyWithoutInstitutionInput;
};
export type InstitutionUncheckedCreateWithoutDepartmentsInput = {
    id?: string;
    name: string;
    code: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    users?: Prisma.UserUncheckedCreateNestedManyWithoutInstitutionInput;
    resources?: Prisma.ResourceUncheckedCreateNestedManyWithoutInstitutionInput;
    serviceRequests?: Prisma.ServiceRequestUncheckedCreateNestedManyWithoutInstitutionInput;
    bookings?: Prisma.BookingUncheckedCreateNestedManyWithoutInstitutionInput;
    approvals?: Prisma.ApprovalUncheckedCreateNestedManyWithoutInstitutionInput;
    auditEvents?: Prisma.AuditEventUncheckedCreateNestedManyWithoutInstitutionInput;
};
export type InstitutionCreateOrConnectWithoutDepartmentsInput = {
    where: Prisma.InstitutionWhereUniqueInput;
    create: Prisma.XOR<Prisma.InstitutionCreateWithoutDepartmentsInput, Prisma.InstitutionUncheckedCreateWithoutDepartmentsInput>;
};
export type InstitutionUpsertWithoutDepartmentsInput = {
    update: Prisma.XOR<Prisma.InstitutionUpdateWithoutDepartmentsInput, Prisma.InstitutionUncheckedUpdateWithoutDepartmentsInput>;
    create: Prisma.XOR<Prisma.InstitutionCreateWithoutDepartmentsInput, Prisma.InstitutionUncheckedCreateWithoutDepartmentsInput>;
    where?: Prisma.InstitutionWhereInput;
};
export type InstitutionUpdateToOneWithWhereWithoutDepartmentsInput = {
    where?: Prisma.InstitutionWhereInput;
    data: Prisma.XOR<Prisma.InstitutionUpdateWithoutDepartmentsInput, Prisma.InstitutionUncheckedUpdateWithoutDepartmentsInput>;
};
export type InstitutionUpdateWithoutDepartmentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.UserUpdateManyWithoutInstitutionNestedInput;
    resources?: Prisma.ResourceUpdateManyWithoutInstitutionNestedInput;
    serviceRequests?: Prisma.ServiceRequestUpdateManyWithoutInstitutionNestedInput;
    bookings?: Prisma.BookingUpdateManyWithoutInstitutionNestedInput;
    approvals?: Prisma.ApprovalUpdateManyWithoutInstitutionNestedInput;
    auditEvents?: Prisma.AuditEventUpdateManyWithoutInstitutionNestedInput;
};
export type InstitutionUncheckedUpdateWithoutDepartmentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.UserUncheckedUpdateManyWithoutInstitutionNestedInput;
    resources?: Prisma.ResourceUncheckedUpdateManyWithoutInstitutionNestedInput;
    serviceRequests?: Prisma.ServiceRequestUncheckedUpdateManyWithoutInstitutionNestedInput;
    bookings?: Prisma.BookingUncheckedUpdateManyWithoutInstitutionNestedInput;
    approvals?: Prisma.ApprovalUncheckedUpdateManyWithoutInstitutionNestedInput;
    auditEvents?: Prisma.AuditEventUncheckedUpdateManyWithoutInstitutionNestedInput;
};
export type InstitutionCreateWithoutUsersInput = {
    id?: string;
    name: string;
    code: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    departments?: Prisma.DepartmentCreateNestedManyWithoutInstitutionInput;
    resources?: Prisma.ResourceCreateNestedManyWithoutInstitutionInput;
    serviceRequests?: Prisma.ServiceRequestCreateNestedManyWithoutInstitutionInput;
    bookings?: Prisma.BookingCreateNestedManyWithoutInstitutionInput;
    approvals?: Prisma.ApprovalCreateNestedManyWithoutInstitutionInput;
    auditEvents?: Prisma.AuditEventCreateNestedManyWithoutInstitutionInput;
};
export type InstitutionUncheckedCreateWithoutUsersInput = {
    id?: string;
    name: string;
    code: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    departments?: Prisma.DepartmentUncheckedCreateNestedManyWithoutInstitutionInput;
    resources?: Prisma.ResourceUncheckedCreateNestedManyWithoutInstitutionInput;
    serviceRequests?: Prisma.ServiceRequestUncheckedCreateNestedManyWithoutInstitutionInput;
    bookings?: Prisma.BookingUncheckedCreateNestedManyWithoutInstitutionInput;
    approvals?: Prisma.ApprovalUncheckedCreateNestedManyWithoutInstitutionInput;
    auditEvents?: Prisma.AuditEventUncheckedCreateNestedManyWithoutInstitutionInput;
};
export type InstitutionCreateOrConnectWithoutUsersInput = {
    where: Prisma.InstitutionWhereUniqueInput;
    create: Prisma.XOR<Prisma.InstitutionCreateWithoutUsersInput, Prisma.InstitutionUncheckedCreateWithoutUsersInput>;
};
export type InstitutionUpsertWithoutUsersInput = {
    update: Prisma.XOR<Prisma.InstitutionUpdateWithoutUsersInput, Prisma.InstitutionUncheckedUpdateWithoutUsersInput>;
    create: Prisma.XOR<Prisma.InstitutionCreateWithoutUsersInput, Prisma.InstitutionUncheckedCreateWithoutUsersInput>;
    where?: Prisma.InstitutionWhereInput;
};
export type InstitutionUpdateToOneWithWhereWithoutUsersInput = {
    where?: Prisma.InstitutionWhereInput;
    data: Prisma.XOR<Prisma.InstitutionUpdateWithoutUsersInput, Prisma.InstitutionUncheckedUpdateWithoutUsersInput>;
};
export type InstitutionUpdateWithoutUsersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    departments?: Prisma.DepartmentUpdateManyWithoutInstitutionNestedInput;
    resources?: Prisma.ResourceUpdateManyWithoutInstitutionNestedInput;
    serviceRequests?: Prisma.ServiceRequestUpdateManyWithoutInstitutionNestedInput;
    bookings?: Prisma.BookingUpdateManyWithoutInstitutionNestedInput;
    approvals?: Prisma.ApprovalUpdateManyWithoutInstitutionNestedInput;
    auditEvents?: Prisma.AuditEventUpdateManyWithoutInstitutionNestedInput;
};
export type InstitutionUncheckedUpdateWithoutUsersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    departments?: Prisma.DepartmentUncheckedUpdateManyWithoutInstitutionNestedInput;
    resources?: Prisma.ResourceUncheckedUpdateManyWithoutInstitutionNestedInput;
    serviceRequests?: Prisma.ServiceRequestUncheckedUpdateManyWithoutInstitutionNestedInput;
    bookings?: Prisma.BookingUncheckedUpdateManyWithoutInstitutionNestedInput;
    approvals?: Prisma.ApprovalUncheckedUpdateManyWithoutInstitutionNestedInput;
    auditEvents?: Prisma.AuditEventUncheckedUpdateManyWithoutInstitutionNestedInput;
};
export type InstitutionCreateWithoutResourcesInput = {
    id?: string;
    name: string;
    code: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    departments?: Prisma.DepartmentCreateNestedManyWithoutInstitutionInput;
    users?: Prisma.UserCreateNestedManyWithoutInstitutionInput;
    serviceRequests?: Prisma.ServiceRequestCreateNestedManyWithoutInstitutionInput;
    bookings?: Prisma.BookingCreateNestedManyWithoutInstitutionInput;
    approvals?: Prisma.ApprovalCreateNestedManyWithoutInstitutionInput;
    auditEvents?: Prisma.AuditEventCreateNestedManyWithoutInstitutionInput;
};
export type InstitutionUncheckedCreateWithoutResourcesInput = {
    id?: string;
    name: string;
    code: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    departments?: Prisma.DepartmentUncheckedCreateNestedManyWithoutInstitutionInput;
    users?: Prisma.UserUncheckedCreateNestedManyWithoutInstitutionInput;
    serviceRequests?: Prisma.ServiceRequestUncheckedCreateNestedManyWithoutInstitutionInput;
    bookings?: Prisma.BookingUncheckedCreateNestedManyWithoutInstitutionInput;
    approvals?: Prisma.ApprovalUncheckedCreateNestedManyWithoutInstitutionInput;
    auditEvents?: Prisma.AuditEventUncheckedCreateNestedManyWithoutInstitutionInput;
};
export type InstitutionCreateOrConnectWithoutResourcesInput = {
    where: Prisma.InstitutionWhereUniqueInput;
    create: Prisma.XOR<Prisma.InstitutionCreateWithoutResourcesInput, Prisma.InstitutionUncheckedCreateWithoutResourcesInput>;
};
export type InstitutionUpsertWithoutResourcesInput = {
    update: Prisma.XOR<Prisma.InstitutionUpdateWithoutResourcesInput, Prisma.InstitutionUncheckedUpdateWithoutResourcesInput>;
    create: Prisma.XOR<Prisma.InstitutionCreateWithoutResourcesInput, Prisma.InstitutionUncheckedCreateWithoutResourcesInput>;
    where?: Prisma.InstitutionWhereInput;
};
export type InstitutionUpdateToOneWithWhereWithoutResourcesInput = {
    where?: Prisma.InstitutionWhereInput;
    data: Prisma.XOR<Prisma.InstitutionUpdateWithoutResourcesInput, Prisma.InstitutionUncheckedUpdateWithoutResourcesInput>;
};
export type InstitutionUpdateWithoutResourcesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    departments?: Prisma.DepartmentUpdateManyWithoutInstitutionNestedInput;
    users?: Prisma.UserUpdateManyWithoutInstitutionNestedInput;
    serviceRequests?: Prisma.ServiceRequestUpdateManyWithoutInstitutionNestedInput;
    bookings?: Prisma.BookingUpdateManyWithoutInstitutionNestedInput;
    approvals?: Prisma.ApprovalUpdateManyWithoutInstitutionNestedInput;
    auditEvents?: Prisma.AuditEventUpdateManyWithoutInstitutionNestedInput;
};
export type InstitutionUncheckedUpdateWithoutResourcesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    departments?: Prisma.DepartmentUncheckedUpdateManyWithoutInstitutionNestedInput;
    users?: Prisma.UserUncheckedUpdateManyWithoutInstitutionNestedInput;
    serviceRequests?: Prisma.ServiceRequestUncheckedUpdateManyWithoutInstitutionNestedInput;
    bookings?: Prisma.BookingUncheckedUpdateManyWithoutInstitutionNestedInput;
    approvals?: Prisma.ApprovalUncheckedUpdateManyWithoutInstitutionNestedInput;
    auditEvents?: Prisma.AuditEventUncheckedUpdateManyWithoutInstitutionNestedInput;
};
export type InstitutionCreateWithoutServiceRequestsInput = {
    id?: string;
    name: string;
    code: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    departments?: Prisma.DepartmentCreateNestedManyWithoutInstitutionInput;
    users?: Prisma.UserCreateNestedManyWithoutInstitutionInput;
    resources?: Prisma.ResourceCreateNestedManyWithoutInstitutionInput;
    bookings?: Prisma.BookingCreateNestedManyWithoutInstitutionInput;
    approvals?: Prisma.ApprovalCreateNestedManyWithoutInstitutionInput;
    auditEvents?: Prisma.AuditEventCreateNestedManyWithoutInstitutionInput;
};
export type InstitutionUncheckedCreateWithoutServiceRequestsInput = {
    id?: string;
    name: string;
    code: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    departments?: Prisma.DepartmentUncheckedCreateNestedManyWithoutInstitutionInput;
    users?: Prisma.UserUncheckedCreateNestedManyWithoutInstitutionInput;
    resources?: Prisma.ResourceUncheckedCreateNestedManyWithoutInstitutionInput;
    bookings?: Prisma.BookingUncheckedCreateNestedManyWithoutInstitutionInput;
    approvals?: Prisma.ApprovalUncheckedCreateNestedManyWithoutInstitutionInput;
    auditEvents?: Prisma.AuditEventUncheckedCreateNestedManyWithoutInstitutionInput;
};
export type InstitutionCreateOrConnectWithoutServiceRequestsInput = {
    where: Prisma.InstitutionWhereUniqueInput;
    create: Prisma.XOR<Prisma.InstitutionCreateWithoutServiceRequestsInput, Prisma.InstitutionUncheckedCreateWithoutServiceRequestsInput>;
};
export type InstitutionUpsertWithoutServiceRequestsInput = {
    update: Prisma.XOR<Prisma.InstitutionUpdateWithoutServiceRequestsInput, Prisma.InstitutionUncheckedUpdateWithoutServiceRequestsInput>;
    create: Prisma.XOR<Prisma.InstitutionCreateWithoutServiceRequestsInput, Prisma.InstitutionUncheckedCreateWithoutServiceRequestsInput>;
    where?: Prisma.InstitutionWhereInput;
};
export type InstitutionUpdateToOneWithWhereWithoutServiceRequestsInput = {
    where?: Prisma.InstitutionWhereInput;
    data: Prisma.XOR<Prisma.InstitutionUpdateWithoutServiceRequestsInput, Prisma.InstitutionUncheckedUpdateWithoutServiceRequestsInput>;
};
export type InstitutionUpdateWithoutServiceRequestsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    departments?: Prisma.DepartmentUpdateManyWithoutInstitutionNestedInput;
    users?: Prisma.UserUpdateManyWithoutInstitutionNestedInput;
    resources?: Prisma.ResourceUpdateManyWithoutInstitutionNestedInput;
    bookings?: Prisma.BookingUpdateManyWithoutInstitutionNestedInput;
    approvals?: Prisma.ApprovalUpdateManyWithoutInstitutionNestedInput;
    auditEvents?: Prisma.AuditEventUpdateManyWithoutInstitutionNestedInput;
};
export type InstitutionUncheckedUpdateWithoutServiceRequestsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    departments?: Prisma.DepartmentUncheckedUpdateManyWithoutInstitutionNestedInput;
    users?: Prisma.UserUncheckedUpdateManyWithoutInstitutionNestedInput;
    resources?: Prisma.ResourceUncheckedUpdateManyWithoutInstitutionNestedInput;
    bookings?: Prisma.BookingUncheckedUpdateManyWithoutInstitutionNestedInput;
    approvals?: Prisma.ApprovalUncheckedUpdateManyWithoutInstitutionNestedInput;
    auditEvents?: Prisma.AuditEventUncheckedUpdateManyWithoutInstitutionNestedInput;
};
export type InstitutionCreateWithoutBookingsInput = {
    id?: string;
    name: string;
    code: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    departments?: Prisma.DepartmentCreateNestedManyWithoutInstitutionInput;
    users?: Prisma.UserCreateNestedManyWithoutInstitutionInput;
    resources?: Prisma.ResourceCreateNestedManyWithoutInstitutionInput;
    serviceRequests?: Prisma.ServiceRequestCreateNestedManyWithoutInstitutionInput;
    approvals?: Prisma.ApprovalCreateNestedManyWithoutInstitutionInput;
    auditEvents?: Prisma.AuditEventCreateNestedManyWithoutInstitutionInput;
};
export type InstitutionUncheckedCreateWithoutBookingsInput = {
    id?: string;
    name: string;
    code: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    departments?: Prisma.DepartmentUncheckedCreateNestedManyWithoutInstitutionInput;
    users?: Prisma.UserUncheckedCreateNestedManyWithoutInstitutionInput;
    resources?: Prisma.ResourceUncheckedCreateNestedManyWithoutInstitutionInput;
    serviceRequests?: Prisma.ServiceRequestUncheckedCreateNestedManyWithoutInstitutionInput;
    approvals?: Prisma.ApprovalUncheckedCreateNestedManyWithoutInstitutionInput;
    auditEvents?: Prisma.AuditEventUncheckedCreateNestedManyWithoutInstitutionInput;
};
export type InstitutionCreateOrConnectWithoutBookingsInput = {
    where: Prisma.InstitutionWhereUniqueInput;
    create: Prisma.XOR<Prisma.InstitutionCreateWithoutBookingsInput, Prisma.InstitutionUncheckedCreateWithoutBookingsInput>;
};
export type InstitutionUpsertWithoutBookingsInput = {
    update: Prisma.XOR<Prisma.InstitutionUpdateWithoutBookingsInput, Prisma.InstitutionUncheckedUpdateWithoutBookingsInput>;
    create: Prisma.XOR<Prisma.InstitutionCreateWithoutBookingsInput, Prisma.InstitutionUncheckedCreateWithoutBookingsInput>;
    where?: Prisma.InstitutionWhereInput;
};
export type InstitutionUpdateToOneWithWhereWithoutBookingsInput = {
    where?: Prisma.InstitutionWhereInput;
    data: Prisma.XOR<Prisma.InstitutionUpdateWithoutBookingsInput, Prisma.InstitutionUncheckedUpdateWithoutBookingsInput>;
};
export type InstitutionUpdateWithoutBookingsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    departments?: Prisma.DepartmentUpdateManyWithoutInstitutionNestedInput;
    users?: Prisma.UserUpdateManyWithoutInstitutionNestedInput;
    resources?: Prisma.ResourceUpdateManyWithoutInstitutionNestedInput;
    serviceRequests?: Prisma.ServiceRequestUpdateManyWithoutInstitutionNestedInput;
    approvals?: Prisma.ApprovalUpdateManyWithoutInstitutionNestedInput;
    auditEvents?: Prisma.AuditEventUpdateManyWithoutInstitutionNestedInput;
};
export type InstitutionUncheckedUpdateWithoutBookingsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    departments?: Prisma.DepartmentUncheckedUpdateManyWithoutInstitutionNestedInput;
    users?: Prisma.UserUncheckedUpdateManyWithoutInstitutionNestedInput;
    resources?: Prisma.ResourceUncheckedUpdateManyWithoutInstitutionNestedInput;
    serviceRequests?: Prisma.ServiceRequestUncheckedUpdateManyWithoutInstitutionNestedInput;
    approvals?: Prisma.ApprovalUncheckedUpdateManyWithoutInstitutionNestedInput;
    auditEvents?: Prisma.AuditEventUncheckedUpdateManyWithoutInstitutionNestedInput;
};
export type InstitutionCreateWithoutApprovalsInput = {
    id?: string;
    name: string;
    code: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    departments?: Prisma.DepartmentCreateNestedManyWithoutInstitutionInput;
    users?: Prisma.UserCreateNestedManyWithoutInstitutionInput;
    resources?: Prisma.ResourceCreateNestedManyWithoutInstitutionInput;
    serviceRequests?: Prisma.ServiceRequestCreateNestedManyWithoutInstitutionInput;
    bookings?: Prisma.BookingCreateNestedManyWithoutInstitutionInput;
    auditEvents?: Prisma.AuditEventCreateNestedManyWithoutInstitutionInput;
};
export type InstitutionUncheckedCreateWithoutApprovalsInput = {
    id?: string;
    name: string;
    code: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    departments?: Prisma.DepartmentUncheckedCreateNestedManyWithoutInstitutionInput;
    users?: Prisma.UserUncheckedCreateNestedManyWithoutInstitutionInput;
    resources?: Prisma.ResourceUncheckedCreateNestedManyWithoutInstitutionInput;
    serviceRequests?: Prisma.ServiceRequestUncheckedCreateNestedManyWithoutInstitutionInput;
    bookings?: Prisma.BookingUncheckedCreateNestedManyWithoutInstitutionInput;
    auditEvents?: Prisma.AuditEventUncheckedCreateNestedManyWithoutInstitutionInput;
};
export type InstitutionCreateOrConnectWithoutApprovalsInput = {
    where: Prisma.InstitutionWhereUniqueInput;
    create: Prisma.XOR<Prisma.InstitutionCreateWithoutApprovalsInput, Prisma.InstitutionUncheckedCreateWithoutApprovalsInput>;
};
export type InstitutionUpsertWithoutApprovalsInput = {
    update: Prisma.XOR<Prisma.InstitutionUpdateWithoutApprovalsInput, Prisma.InstitutionUncheckedUpdateWithoutApprovalsInput>;
    create: Prisma.XOR<Prisma.InstitutionCreateWithoutApprovalsInput, Prisma.InstitutionUncheckedCreateWithoutApprovalsInput>;
    where?: Prisma.InstitutionWhereInput;
};
export type InstitutionUpdateToOneWithWhereWithoutApprovalsInput = {
    where?: Prisma.InstitutionWhereInput;
    data: Prisma.XOR<Prisma.InstitutionUpdateWithoutApprovalsInput, Prisma.InstitutionUncheckedUpdateWithoutApprovalsInput>;
};
export type InstitutionUpdateWithoutApprovalsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    departments?: Prisma.DepartmentUpdateManyWithoutInstitutionNestedInput;
    users?: Prisma.UserUpdateManyWithoutInstitutionNestedInput;
    resources?: Prisma.ResourceUpdateManyWithoutInstitutionNestedInput;
    serviceRequests?: Prisma.ServiceRequestUpdateManyWithoutInstitutionNestedInput;
    bookings?: Prisma.BookingUpdateManyWithoutInstitutionNestedInput;
    auditEvents?: Prisma.AuditEventUpdateManyWithoutInstitutionNestedInput;
};
export type InstitutionUncheckedUpdateWithoutApprovalsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    departments?: Prisma.DepartmentUncheckedUpdateManyWithoutInstitutionNestedInput;
    users?: Prisma.UserUncheckedUpdateManyWithoutInstitutionNestedInput;
    resources?: Prisma.ResourceUncheckedUpdateManyWithoutInstitutionNestedInput;
    serviceRequests?: Prisma.ServiceRequestUncheckedUpdateManyWithoutInstitutionNestedInput;
    bookings?: Prisma.BookingUncheckedUpdateManyWithoutInstitutionNestedInput;
    auditEvents?: Prisma.AuditEventUncheckedUpdateManyWithoutInstitutionNestedInput;
};
export type InstitutionCreateWithoutAuditEventsInput = {
    id?: string;
    name: string;
    code: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    departments?: Prisma.DepartmentCreateNestedManyWithoutInstitutionInput;
    users?: Prisma.UserCreateNestedManyWithoutInstitutionInput;
    resources?: Prisma.ResourceCreateNestedManyWithoutInstitutionInput;
    serviceRequests?: Prisma.ServiceRequestCreateNestedManyWithoutInstitutionInput;
    bookings?: Prisma.BookingCreateNestedManyWithoutInstitutionInput;
    approvals?: Prisma.ApprovalCreateNestedManyWithoutInstitutionInput;
};
export type InstitutionUncheckedCreateWithoutAuditEventsInput = {
    id?: string;
    name: string;
    code: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    departments?: Prisma.DepartmentUncheckedCreateNestedManyWithoutInstitutionInput;
    users?: Prisma.UserUncheckedCreateNestedManyWithoutInstitutionInput;
    resources?: Prisma.ResourceUncheckedCreateNestedManyWithoutInstitutionInput;
    serviceRequests?: Prisma.ServiceRequestUncheckedCreateNestedManyWithoutInstitutionInput;
    bookings?: Prisma.BookingUncheckedCreateNestedManyWithoutInstitutionInput;
    approvals?: Prisma.ApprovalUncheckedCreateNestedManyWithoutInstitutionInput;
};
export type InstitutionCreateOrConnectWithoutAuditEventsInput = {
    where: Prisma.InstitutionWhereUniqueInput;
    create: Prisma.XOR<Prisma.InstitutionCreateWithoutAuditEventsInput, Prisma.InstitutionUncheckedCreateWithoutAuditEventsInput>;
};
export type InstitutionUpsertWithoutAuditEventsInput = {
    update: Prisma.XOR<Prisma.InstitutionUpdateWithoutAuditEventsInput, Prisma.InstitutionUncheckedUpdateWithoutAuditEventsInput>;
    create: Prisma.XOR<Prisma.InstitutionCreateWithoutAuditEventsInput, Prisma.InstitutionUncheckedCreateWithoutAuditEventsInput>;
    where?: Prisma.InstitutionWhereInput;
};
export type InstitutionUpdateToOneWithWhereWithoutAuditEventsInput = {
    where?: Prisma.InstitutionWhereInput;
    data: Prisma.XOR<Prisma.InstitutionUpdateWithoutAuditEventsInput, Prisma.InstitutionUncheckedUpdateWithoutAuditEventsInput>;
};
export type InstitutionUpdateWithoutAuditEventsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    departments?: Prisma.DepartmentUpdateManyWithoutInstitutionNestedInput;
    users?: Prisma.UserUpdateManyWithoutInstitutionNestedInput;
    resources?: Prisma.ResourceUpdateManyWithoutInstitutionNestedInput;
    serviceRequests?: Prisma.ServiceRequestUpdateManyWithoutInstitutionNestedInput;
    bookings?: Prisma.BookingUpdateManyWithoutInstitutionNestedInput;
    approvals?: Prisma.ApprovalUpdateManyWithoutInstitutionNestedInput;
};
export type InstitutionUncheckedUpdateWithoutAuditEventsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    departments?: Prisma.DepartmentUncheckedUpdateManyWithoutInstitutionNestedInput;
    users?: Prisma.UserUncheckedUpdateManyWithoutInstitutionNestedInput;
    resources?: Prisma.ResourceUncheckedUpdateManyWithoutInstitutionNestedInput;
    serviceRequests?: Prisma.ServiceRequestUncheckedUpdateManyWithoutInstitutionNestedInput;
    bookings?: Prisma.BookingUncheckedUpdateManyWithoutInstitutionNestedInput;
    approvals?: Prisma.ApprovalUncheckedUpdateManyWithoutInstitutionNestedInput;
};
export type InstitutionCountOutputType = {
    departments: number;
    users: number;
    resources: number;
    serviceRequests: number;
    bookings: number;
    approvals: number;
    auditEvents: number;
};
export type InstitutionCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    departments?: boolean | InstitutionCountOutputTypeCountDepartmentsArgs;
    users?: boolean | InstitutionCountOutputTypeCountUsersArgs;
    resources?: boolean | InstitutionCountOutputTypeCountResourcesArgs;
    serviceRequests?: boolean | InstitutionCountOutputTypeCountServiceRequestsArgs;
    bookings?: boolean | InstitutionCountOutputTypeCountBookingsArgs;
    approvals?: boolean | InstitutionCountOutputTypeCountApprovalsArgs;
    auditEvents?: boolean | InstitutionCountOutputTypeCountAuditEventsArgs;
};
export type InstitutionCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionCountOutputTypeSelect<ExtArgs> | null;
};
export type InstitutionCountOutputTypeCountDepartmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DepartmentWhereInput;
};
export type InstitutionCountOutputTypeCountUsersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
};
export type InstitutionCountOutputTypeCountResourcesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ResourceWhereInput;
};
export type InstitutionCountOutputTypeCountServiceRequestsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ServiceRequestWhereInput;
};
export type InstitutionCountOutputTypeCountBookingsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BookingWhereInput;
};
export type InstitutionCountOutputTypeCountApprovalsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ApprovalWhereInput;
};
export type InstitutionCountOutputTypeCountAuditEventsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AuditEventWhereInput;
};
export type InstitutionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    code?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    departments?: boolean | Prisma.Institution$departmentsArgs<ExtArgs>;
    users?: boolean | Prisma.Institution$usersArgs<ExtArgs>;
    resources?: boolean | Prisma.Institution$resourcesArgs<ExtArgs>;
    serviceRequests?: boolean | Prisma.Institution$serviceRequestsArgs<ExtArgs>;
    bookings?: boolean | Prisma.Institution$bookingsArgs<ExtArgs>;
    approvals?: boolean | Prisma.Institution$approvalsArgs<ExtArgs>;
    auditEvents?: boolean | Prisma.Institution$auditEventsArgs<ExtArgs>;
    _count?: boolean | Prisma.InstitutionCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["institution"]>;
export type InstitutionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    code?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["institution"]>;
export type InstitutionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    code?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["institution"]>;
export type InstitutionSelectScalar = {
    id?: boolean;
    name?: boolean;
    code?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type InstitutionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "code" | "createdAt" | "updatedAt", ExtArgs["result"]["institution"]>;
export type InstitutionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    departments?: boolean | Prisma.Institution$departmentsArgs<ExtArgs>;
    users?: boolean | Prisma.Institution$usersArgs<ExtArgs>;
    resources?: boolean | Prisma.Institution$resourcesArgs<ExtArgs>;
    serviceRequests?: boolean | Prisma.Institution$serviceRequestsArgs<ExtArgs>;
    bookings?: boolean | Prisma.Institution$bookingsArgs<ExtArgs>;
    approvals?: boolean | Prisma.Institution$approvalsArgs<ExtArgs>;
    auditEvents?: boolean | Prisma.Institution$auditEventsArgs<ExtArgs>;
    _count?: boolean | Prisma.InstitutionCountOutputTypeDefaultArgs<ExtArgs>;
};
export type InstitutionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type InstitutionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $InstitutionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Institution";
    objects: {
        departments: Prisma.$DepartmentPayload<ExtArgs>[];
        users: Prisma.$UserPayload<ExtArgs>[];
        resources: Prisma.$ResourcePayload<ExtArgs>[];
        serviceRequests: Prisma.$ServiceRequestPayload<ExtArgs>[];
        bookings: Prisma.$BookingPayload<ExtArgs>[];
        approvals: Prisma.$ApprovalPayload<ExtArgs>[];
        auditEvents: Prisma.$AuditEventPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        code: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["institution"]>;
    composites: {};
};
export type InstitutionGetPayload<S extends boolean | null | undefined | InstitutionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$InstitutionPayload, S>;
export type InstitutionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<InstitutionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: InstitutionCountAggregateInputType | true;
};
export interface InstitutionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Institution'];
        meta: {
            name: 'Institution';
        };
    };
    findUnique<T extends InstitutionFindUniqueArgs>(args: Prisma.SelectSubset<T, InstitutionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__InstitutionClient<runtime.Types.Result.GetResult<Prisma.$InstitutionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends InstitutionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, InstitutionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__InstitutionClient<runtime.Types.Result.GetResult<Prisma.$InstitutionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends InstitutionFindFirstArgs>(args?: Prisma.SelectSubset<T, InstitutionFindFirstArgs<ExtArgs>>): Prisma.Prisma__InstitutionClient<runtime.Types.Result.GetResult<Prisma.$InstitutionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends InstitutionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, InstitutionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__InstitutionClient<runtime.Types.Result.GetResult<Prisma.$InstitutionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends InstitutionFindManyArgs>(args?: Prisma.SelectSubset<T, InstitutionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InstitutionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends InstitutionCreateArgs>(args: Prisma.SelectSubset<T, InstitutionCreateArgs<ExtArgs>>): Prisma.Prisma__InstitutionClient<runtime.Types.Result.GetResult<Prisma.$InstitutionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends InstitutionCreateManyArgs>(args?: Prisma.SelectSubset<T, InstitutionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends InstitutionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, InstitutionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InstitutionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends InstitutionDeleteArgs>(args: Prisma.SelectSubset<T, InstitutionDeleteArgs<ExtArgs>>): Prisma.Prisma__InstitutionClient<runtime.Types.Result.GetResult<Prisma.$InstitutionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends InstitutionUpdateArgs>(args: Prisma.SelectSubset<T, InstitutionUpdateArgs<ExtArgs>>): Prisma.Prisma__InstitutionClient<runtime.Types.Result.GetResult<Prisma.$InstitutionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends InstitutionDeleteManyArgs>(args?: Prisma.SelectSubset<T, InstitutionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends InstitutionUpdateManyArgs>(args: Prisma.SelectSubset<T, InstitutionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends InstitutionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, InstitutionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InstitutionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends InstitutionUpsertArgs>(args: Prisma.SelectSubset<T, InstitutionUpsertArgs<ExtArgs>>): Prisma.Prisma__InstitutionClient<runtime.Types.Result.GetResult<Prisma.$InstitutionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends InstitutionCountArgs>(args?: Prisma.Subset<T, InstitutionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], InstitutionCountAggregateOutputType> : number>;
    aggregate<T extends InstitutionAggregateArgs>(args: Prisma.Subset<T, InstitutionAggregateArgs>): Prisma.PrismaPromise<GetInstitutionAggregateType<T>>;
    groupBy<T extends InstitutionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: InstitutionGroupByArgs['orderBy'];
    } : {
        orderBy?: InstitutionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, InstitutionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInstitutionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: InstitutionFieldRefs;
}
export interface Prisma__InstitutionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    departments<T extends Prisma.Institution$departmentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Institution$departmentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    users<T extends Prisma.Institution$usersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Institution$usersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    resources<T extends Prisma.Institution$resourcesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Institution$resourcesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    serviceRequests<T extends Prisma.Institution$serviceRequestsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Institution$serviceRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ServiceRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    bookings<T extends Prisma.Institution$bookingsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Institution$bookingsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    approvals<T extends Prisma.Institution$approvalsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Institution$approvalsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ApprovalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    auditEvents<T extends Prisma.Institution$auditEventsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Institution$auditEventsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AuditEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface InstitutionFieldRefs {
    readonly id: Prisma.FieldRef<"Institution", 'String'>;
    readonly name: Prisma.FieldRef<"Institution", 'String'>;
    readonly code: Prisma.FieldRef<"Institution", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Institution", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Institution", 'DateTime'>;
}
export type InstitutionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionSelect<ExtArgs> | null;
    omit?: Prisma.InstitutionOmit<ExtArgs> | null;
    include?: Prisma.InstitutionInclude<ExtArgs> | null;
    where: Prisma.InstitutionWhereUniqueInput;
};
export type InstitutionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionSelect<ExtArgs> | null;
    omit?: Prisma.InstitutionOmit<ExtArgs> | null;
    include?: Prisma.InstitutionInclude<ExtArgs> | null;
    where: Prisma.InstitutionWhereUniqueInput;
};
export type InstitutionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionSelect<ExtArgs> | null;
    omit?: Prisma.InstitutionOmit<ExtArgs> | null;
    include?: Prisma.InstitutionInclude<ExtArgs> | null;
    where?: Prisma.InstitutionWhereInput;
    orderBy?: Prisma.InstitutionOrderByWithRelationInput | Prisma.InstitutionOrderByWithRelationInput[];
    cursor?: Prisma.InstitutionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InstitutionScalarFieldEnum | Prisma.InstitutionScalarFieldEnum[];
};
export type InstitutionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionSelect<ExtArgs> | null;
    omit?: Prisma.InstitutionOmit<ExtArgs> | null;
    include?: Prisma.InstitutionInclude<ExtArgs> | null;
    where?: Prisma.InstitutionWhereInput;
    orderBy?: Prisma.InstitutionOrderByWithRelationInput | Prisma.InstitutionOrderByWithRelationInput[];
    cursor?: Prisma.InstitutionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InstitutionScalarFieldEnum | Prisma.InstitutionScalarFieldEnum[];
};
export type InstitutionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionSelect<ExtArgs> | null;
    omit?: Prisma.InstitutionOmit<ExtArgs> | null;
    include?: Prisma.InstitutionInclude<ExtArgs> | null;
    where?: Prisma.InstitutionWhereInput;
    orderBy?: Prisma.InstitutionOrderByWithRelationInput | Prisma.InstitutionOrderByWithRelationInput[];
    cursor?: Prisma.InstitutionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InstitutionScalarFieldEnum | Prisma.InstitutionScalarFieldEnum[];
};
export type InstitutionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionSelect<ExtArgs> | null;
    omit?: Prisma.InstitutionOmit<ExtArgs> | null;
    include?: Prisma.InstitutionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InstitutionCreateInput, Prisma.InstitutionUncheckedCreateInput>;
};
export type InstitutionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.InstitutionCreateManyInput | Prisma.InstitutionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type InstitutionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.InstitutionOmit<ExtArgs> | null;
    data: Prisma.InstitutionCreateManyInput | Prisma.InstitutionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type InstitutionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionSelect<ExtArgs> | null;
    omit?: Prisma.InstitutionOmit<ExtArgs> | null;
    include?: Prisma.InstitutionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InstitutionUpdateInput, Prisma.InstitutionUncheckedUpdateInput>;
    where: Prisma.InstitutionWhereUniqueInput;
};
export type InstitutionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.InstitutionUpdateManyMutationInput, Prisma.InstitutionUncheckedUpdateManyInput>;
    where?: Prisma.InstitutionWhereInput;
    limit?: number;
};
export type InstitutionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.InstitutionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InstitutionUpdateManyMutationInput, Prisma.InstitutionUncheckedUpdateManyInput>;
    where?: Prisma.InstitutionWhereInput;
    limit?: number;
};
export type InstitutionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionSelect<ExtArgs> | null;
    omit?: Prisma.InstitutionOmit<ExtArgs> | null;
    include?: Prisma.InstitutionInclude<ExtArgs> | null;
    where: Prisma.InstitutionWhereUniqueInput;
    create: Prisma.XOR<Prisma.InstitutionCreateInput, Prisma.InstitutionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.InstitutionUpdateInput, Prisma.InstitutionUncheckedUpdateInput>;
};
export type InstitutionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionSelect<ExtArgs> | null;
    omit?: Prisma.InstitutionOmit<ExtArgs> | null;
    include?: Prisma.InstitutionInclude<ExtArgs> | null;
    where: Prisma.InstitutionWhereUniqueInput;
};
export type InstitutionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InstitutionWhereInput;
    limit?: number;
};
export type Institution$departmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DepartmentSelect<ExtArgs> | null;
    omit?: Prisma.DepartmentOmit<ExtArgs> | null;
    include?: Prisma.DepartmentInclude<ExtArgs> | null;
    where?: Prisma.DepartmentWhereInput;
    orderBy?: Prisma.DepartmentOrderByWithRelationInput | Prisma.DepartmentOrderByWithRelationInput[];
    cursor?: Prisma.DepartmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DepartmentScalarFieldEnum | Prisma.DepartmentScalarFieldEnum[];
};
export type Institution$usersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type Institution$resourcesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ResourceSelect<ExtArgs> | null;
    omit?: Prisma.ResourceOmit<ExtArgs> | null;
    include?: Prisma.ResourceInclude<ExtArgs> | null;
    where?: Prisma.ResourceWhereInput;
    orderBy?: Prisma.ResourceOrderByWithRelationInput | Prisma.ResourceOrderByWithRelationInput[];
    cursor?: Prisma.ResourceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ResourceScalarFieldEnum | Prisma.ResourceScalarFieldEnum[];
};
export type Institution$serviceRequestsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type Institution$bookingsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type Institution$approvalsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type Institution$auditEventsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type InstitutionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionSelect<ExtArgs> | null;
    omit?: Prisma.InstitutionOmit<ExtArgs> | null;
    include?: Prisma.InstitutionInclude<ExtArgs> | null;
};
export {};
