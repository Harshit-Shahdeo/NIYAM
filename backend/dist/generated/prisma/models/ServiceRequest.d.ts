import type * as runtime from "@prisma/client/runtime/library";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ServiceRequestModel = runtime.Types.Result.DefaultSelection<Prisma.$ServiceRequestPayload>;
export type AggregateServiceRequest = {
    _count: ServiceRequestCountAggregateOutputType | null;
    _min: ServiceRequestMinAggregateOutputType | null;
    _max: ServiceRequestMaxAggregateOutputType | null;
};
export type ServiceRequestMinAggregateOutputType = {
    id: string | null;
    institutionId: string | null;
    userId: string | null;
    message: string | null;
    intent: string | null;
    status: $Enums.ServiceRequestStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ServiceRequestMaxAggregateOutputType = {
    id: string | null;
    institutionId: string | null;
    userId: string | null;
    message: string | null;
    intent: string | null;
    status: $Enums.ServiceRequestStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ServiceRequestCountAggregateOutputType = {
    id: number;
    institutionId: number;
    userId: number;
    message: number;
    intent: number;
    status: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ServiceRequestMinAggregateInputType = {
    id?: true;
    institutionId?: true;
    userId?: true;
    message?: true;
    intent?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ServiceRequestMaxAggregateInputType = {
    id?: true;
    institutionId?: true;
    userId?: true;
    message?: true;
    intent?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ServiceRequestCountAggregateInputType = {
    id?: true;
    institutionId?: true;
    userId?: true;
    message?: true;
    intent?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ServiceRequestAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ServiceRequestWhereInput;
    orderBy?: Prisma.ServiceRequestOrderByWithRelationInput | Prisma.ServiceRequestOrderByWithRelationInput[];
    cursor?: Prisma.ServiceRequestWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ServiceRequestCountAggregateInputType;
    _min?: ServiceRequestMinAggregateInputType;
    _max?: ServiceRequestMaxAggregateInputType;
};
export type GetServiceRequestAggregateType<T extends ServiceRequestAggregateArgs> = {
    [P in keyof T & keyof AggregateServiceRequest]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateServiceRequest[P]> : Prisma.GetScalarType<T[P], AggregateServiceRequest[P]>;
};
export type ServiceRequestGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ServiceRequestWhereInput;
    orderBy?: Prisma.ServiceRequestOrderByWithAggregationInput | Prisma.ServiceRequestOrderByWithAggregationInput[];
    by: Prisma.ServiceRequestScalarFieldEnum[] | Prisma.ServiceRequestScalarFieldEnum;
    having?: Prisma.ServiceRequestScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ServiceRequestCountAggregateInputType | true;
    _min?: ServiceRequestMinAggregateInputType;
    _max?: ServiceRequestMaxAggregateInputType;
};
export type ServiceRequestGroupByOutputType = {
    id: string;
    institutionId: string;
    userId: string;
    message: string;
    intent: string | null;
    status: $Enums.ServiceRequestStatus;
    createdAt: Date;
    updatedAt: Date;
    _count: ServiceRequestCountAggregateOutputType | null;
    _min: ServiceRequestMinAggregateOutputType | null;
    _max: ServiceRequestMaxAggregateOutputType | null;
};
type GetServiceRequestGroupByPayload<T extends ServiceRequestGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ServiceRequestGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ServiceRequestGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ServiceRequestGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ServiceRequestGroupByOutputType[P]>;
}>>;
export type ServiceRequestWhereInput = {
    AND?: Prisma.ServiceRequestWhereInput | Prisma.ServiceRequestWhereInput[];
    OR?: Prisma.ServiceRequestWhereInput[];
    NOT?: Prisma.ServiceRequestWhereInput | Prisma.ServiceRequestWhereInput[];
    id?: Prisma.StringFilter<"ServiceRequest"> | string;
    institutionId?: Prisma.StringFilter<"ServiceRequest"> | string;
    userId?: Prisma.StringFilter<"ServiceRequest"> | string;
    message?: Prisma.StringFilter<"ServiceRequest"> | string;
    intent?: Prisma.StringNullableFilter<"ServiceRequest"> | string | null;
    status?: Prisma.EnumServiceRequestStatusFilter<"ServiceRequest"> | $Enums.ServiceRequestStatus;
    createdAt?: Prisma.DateTimeFilter<"ServiceRequest"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ServiceRequest"> | Date | string;
    institution?: Prisma.XOR<Prisma.InstitutionScalarRelationFilter, Prisma.InstitutionWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    booking?: Prisma.XOR<Prisma.BookingNullableScalarRelationFilter, Prisma.BookingWhereInput> | null;
    approval?: Prisma.XOR<Prisma.ApprovalNullableScalarRelationFilter, Prisma.ApprovalWhereInput> | null;
    auditEvents?: Prisma.AuditEventListRelationFilter;
};
export type ServiceRequestOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    institutionId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    intent?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    institution?: Prisma.InstitutionOrderByWithRelationInput;
    user?: Prisma.UserOrderByWithRelationInput;
    booking?: Prisma.BookingOrderByWithRelationInput;
    approval?: Prisma.ApprovalOrderByWithRelationInput;
    auditEvents?: Prisma.AuditEventOrderByRelationAggregateInput;
};
export type ServiceRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ServiceRequestWhereInput | Prisma.ServiceRequestWhereInput[];
    OR?: Prisma.ServiceRequestWhereInput[];
    NOT?: Prisma.ServiceRequestWhereInput | Prisma.ServiceRequestWhereInput[];
    institutionId?: Prisma.StringFilter<"ServiceRequest"> | string;
    userId?: Prisma.StringFilter<"ServiceRequest"> | string;
    message?: Prisma.StringFilter<"ServiceRequest"> | string;
    intent?: Prisma.StringNullableFilter<"ServiceRequest"> | string | null;
    status?: Prisma.EnumServiceRequestStatusFilter<"ServiceRequest"> | $Enums.ServiceRequestStatus;
    createdAt?: Prisma.DateTimeFilter<"ServiceRequest"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ServiceRequest"> | Date | string;
    institution?: Prisma.XOR<Prisma.InstitutionScalarRelationFilter, Prisma.InstitutionWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    booking?: Prisma.XOR<Prisma.BookingNullableScalarRelationFilter, Prisma.BookingWhereInput> | null;
    approval?: Prisma.XOR<Prisma.ApprovalNullableScalarRelationFilter, Prisma.ApprovalWhereInput> | null;
    auditEvents?: Prisma.AuditEventListRelationFilter;
}, "id">;
export type ServiceRequestOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    institutionId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    intent?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ServiceRequestCountOrderByAggregateInput;
    _max?: Prisma.ServiceRequestMaxOrderByAggregateInput;
    _min?: Prisma.ServiceRequestMinOrderByAggregateInput;
};
export type ServiceRequestScalarWhereWithAggregatesInput = {
    AND?: Prisma.ServiceRequestScalarWhereWithAggregatesInput | Prisma.ServiceRequestScalarWhereWithAggregatesInput[];
    OR?: Prisma.ServiceRequestScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ServiceRequestScalarWhereWithAggregatesInput | Prisma.ServiceRequestScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ServiceRequest"> | string;
    institutionId?: Prisma.StringWithAggregatesFilter<"ServiceRequest"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"ServiceRequest"> | string;
    message?: Prisma.StringWithAggregatesFilter<"ServiceRequest"> | string;
    intent?: Prisma.StringNullableWithAggregatesFilter<"ServiceRequest"> | string | null;
    status?: Prisma.EnumServiceRequestStatusWithAggregatesFilter<"ServiceRequest"> | $Enums.ServiceRequestStatus;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ServiceRequest"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"ServiceRequest"> | Date | string;
};
export type ServiceRequestCreateInput = {
    id?: string;
    message: string;
    intent?: string | null;
    status?: $Enums.ServiceRequestStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    institution: Prisma.InstitutionCreateNestedOneWithoutServiceRequestsInput;
    user: Prisma.UserCreateNestedOneWithoutServiceRequestsInput;
    booking?: Prisma.BookingCreateNestedOneWithoutRequestInput;
    approval?: Prisma.ApprovalCreateNestedOneWithoutRequestInput;
    auditEvents?: Prisma.AuditEventCreateNestedManyWithoutRequestInput;
};
export type ServiceRequestUncheckedCreateInput = {
    id?: string;
    institutionId: string;
    userId: string;
    message: string;
    intent?: string | null;
    status?: $Enums.ServiceRequestStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    booking?: Prisma.BookingUncheckedCreateNestedOneWithoutRequestInput;
    approval?: Prisma.ApprovalUncheckedCreateNestedOneWithoutRequestInput;
    auditEvents?: Prisma.AuditEventUncheckedCreateNestedManyWithoutRequestInput;
};
export type ServiceRequestUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    intent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumServiceRequestStatusFieldUpdateOperationsInput | $Enums.ServiceRequestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    institution?: Prisma.InstitutionUpdateOneRequiredWithoutServiceRequestsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutServiceRequestsNestedInput;
    booking?: Prisma.BookingUpdateOneWithoutRequestNestedInput;
    approval?: Prisma.ApprovalUpdateOneWithoutRequestNestedInput;
    auditEvents?: Prisma.AuditEventUpdateManyWithoutRequestNestedInput;
};
export type ServiceRequestUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    institutionId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    intent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumServiceRequestStatusFieldUpdateOperationsInput | $Enums.ServiceRequestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    booking?: Prisma.BookingUncheckedUpdateOneWithoutRequestNestedInput;
    approval?: Prisma.ApprovalUncheckedUpdateOneWithoutRequestNestedInput;
    auditEvents?: Prisma.AuditEventUncheckedUpdateManyWithoutRequestNestedInput;
};
export type ServiceRequestCreateManyInput = {
    id?: string;
    institutionId: string;
    userId: string;
    message: string;
    intent?: string | null;
    status?: $Enums.ServiceRequestStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ServiceRequestUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    intent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumServiceRequestStatusFieldUpdateOperationsInput | $Enums.ServiceRequestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ServiceRequestUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    institutionId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    intent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumServiceRequestStatusFieldUpdateOperationsInput | $Enums.ServiceRequestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ServiceRequestListRelationFilter = {
    every?: Prisma.ServiceRequestWhereInput;
    some?: Prisma.ServiceRequestWhereInput;
    none?: Prisma.ServiceRequestWhereInput;
};
export type ServiceRequestOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ServiceRequestCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    institutionId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    intent?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ServiceRequestMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    institutionId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    intent?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ServiceRequestMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    institutionId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    intent?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ServiceRequestScalarRelationFilter = {
    is?: Prisma.ServiceRequestWhereInput;
    isNot?: Prisma.ServiceRequestWhereInput;
};
export type ServiceRequestCreateNestedManyWithoutInstitutionInput = {
    create?: Prisma.XOR<Prisma.ServiceRequestCreateWithoutInstitutionInput, Prisma.ServiceRequestUncheckedCreateWithoutInstitutionInput> | Prisma.ServiceRequestCreateWithoutInstitutionInput[] | Prisma.ServiceRequestUncheckedCreateWithoutInstitutionInput[];
    connectOrCreate?: Prisma.ServiceRequestCreateOrConnectWithoutInstitutionInput | Prisma.ServiceRequestCreateOrConnectWithoutInstitutionInput[];
    createMany?: Prisma.ServiceRequestCreateManyInstitutionInputEnvelope;
    connect?: Prisma.ServiceRequestWhereUniqueInput | Prisma.ServiceRequestWhereUniqueInput[];
};
export type ServiceRequestUncheckedCreateNestedManyWithoutInstitutionInput = {
    create?: Prisma.XOR<Prisma.ServiceRequestCreateWithoutInstitutionInput, Prisma.ServiceRequestUncheckedCreateWithoutInstitutionInput> | Prisma.ServiceRequestCreateWithoutInstitutionInput[] | Prisma.ServiceRequestUncheckedCreateWithoutInstitutionInput[];
    connectOrCreate?: Prisma.ServiceRequestCreateOrConnectWithoutInstitutionInput | Prisma.ServiceRequestCreateOrConnectWithoutInstitutionInput[];
    createMany?: Prisma.ServiceRequestCreateManyInstitutionInputEnvelope;
    connect?: Prisma.ServiceRequestWhereUniqueInput | Prisma.ServiceRequestWhereUniqueInput[];
};
export type ServiceRequestUpdateManyWithoutInstitutionNestedInput = {
    create?: Prisma.XOR<Prisma.ServiceRequestCreateWithoutInstitutionInput, Prisma.ServiceRequestUncheckedCreateWithoutInstitutionInput> | Prisma.ServiceRequestCreateWithoutInstitutionInput[] | Prisma.ServiceRequestUncheckedCreateWithoutInstitutionInput[];
    connectOrCreate?: Prisma.ServiceRequestCreateOrConnectWithoutInstitutionInput | Prisma.ServiceRequestCreateOrConnectWithoutInstitutionInput[];
    upsert?: Prisma.ServiceRequestUpsertWithWhereUniqueWithoutInstitutionInput | Prisma.ServiceRequestUpsertWithWhereUniqueWithoutInstitutionInput[];
    createMany?: Prisma.ServiceRequestCreateManyInstitutionInputEnvelope;
    set?: Prisma.ServiceRequestWhereUniqueInput | Prisma.ServiceRequestWhereUniqueInput[];
    disconnect?: Prisma.ServiceRequestWhereUniqueInput | Prisma.ServiceRequestWhereUniqueInput[];
    delete?: Prisma.ServiceRequestWhereUniqueInput | Prisma.ServiceRequestWhereUniqueInput[];
    connect?: Prisma.ServiceRequestWhereUniqueInput | Prisma.ServiceRequestWhereUniqueInput[];
    update?: Prisma.ServiceRequestUpdateWithWhereUniqueWithoutInstitutionInput | Prisma.ServiceRequestUpdateWithWhereUniqueWithoutInstitutionInput[];
    updateMany?: Prisma.ServiceRequestUpdateManyWithWhereWithoutInstitutionInput | Prisma.ServiceRequestUpdateManyWithWhereWithoutInstitutionInput[];
    deleteMany?: Prisma.ServiceRequestScalarWhereInput | Prisma.ServiceRequestScalarWhereInput[];
};
export type ServiceRequestUncheckedUpdateManyWithoutInstitutionNestedInput = {
    create?: Prisma.XOR<Prisma.ServiceRequestCreateWithoutInstitutionInput, Prisma.ServiceRequestUncheckedCreateWithoutInstitutionInput> | Prisma.ServiceRequestCreateWithoutInstitutionInput[] | Prisma.ServiceRequestUncheckedCreateWithoutInstitutionInput[];
    connectOrCreate?: Prisma.ServiceRequestCreateOrConnectWithoutInstitutionInput | Prisma.ServiceRequestCreateOrConnectWithoutInstitutionInput[];
    upsert?: Prisma.ServiceRequestUpsertWithWhereUniqueWithoutInstitutionInput | Prisma.ServiceRequestUpsertWithWhereUniqueWithoutInstitutionInput[];
    createMany?: Prisma.ServiceRequestCreateManyInstitutionInputEnvelope;
    set?: Prisma.ServiceRequestWhereUniqueInput | Prisma.ServiceRequestWhereUniqueInput[];
    disconnect?: Prisma.ServiceRequestWhereUniqueInput | Prisma.ServiceRequestWhereUniqueInput[];
    delete?: Prisma.ServiceRequestWhereUniqueInput | Prisma.ServiceRequestWhereUniqueInput[];
    connect?: Prisma.ServiceRequestWhereUniqueInput | Prisma.ServiceRequestWhereUniqueInput[];
    update?: Prisma.ServiceRequestUpdateWithWhereUniqueWithoutInstitutionInput | Prisma.ServiceRequestUpdateWithWhereUniqueWithoutInstitutionInput[];
    updateMany?: Prisma.ServiceRequestUpdateManyWithWhereWithoutInstitutionInput | Prisma.ServiceRequestUpdateManyWithWhereWithoutInstitutionInput[];
    deleteMany?: Prisma.ServiceRequestScalarWhereInput | Prisma.ServiceRequestScalarWhereInput[];
};
export type ServiceRequestCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ServiceRequestCreateWithoutUserInput, Prisma.ServiceRequestUncheckedCreateWithoutUserInput> | Prisma.ServiceRequestCreateWithoutUserInput[] | Prisma.ServiceRequestUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ServiceRequestCreateOrConnectWithoutUserInput | Prisma.ServiceRequestCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.ServiceRequestCreateManyUserInputEnvelope;
    connect?: Prisma.ServiceRequestWhereUniqueInput | Prisma.ServiceRequestWhereUniqueInput[];
};
export type ServiceRequestUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ServiceRequestCreateWithoutUserInput, Prisma.ServiceRequestUncheckedCreateWithoutUserInput> | Prisma.ServiceRequestCreateWithoutUserInput[] | Prisma.ServiceRequestUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ServiceRequestCreateOrConnectWithoutUserInput | Prisma.ServiceRequestCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.ServiceRequestCreateManyUserInputEnvelope;
    connect?: Prisma.ServiceRequestWhereUniqueInput | Prisma.ServiceRequestWhereUniqueInput[];
};
export type ServiceRequestUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ServiceRequestCreateWithoutUserInput, Prisma.ServiceRequestUncheckedCreateWithoutUserInput> | Prisma.ServiceRequestCreateWithoutUserInput[] | Prisma.ServiceRequestUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ServiceRequestCreateOrConnectWithoutUserInput | Prisma.ServiceRequestCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.ServiceRequestUpsertWithWhereUniqueWithoutUserInput | Prisma.ServiceRequestUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.ServiceRequestCreateManyUserInputEnvelope;
    set?: Prisma.ServiceRequestWhereUniqueInput | Prisma.ServiceRequestWhereUniqueInput[];
    disconnect?: Prisma.ServiceRequestWhereUniqueInput | Prisma.ServiceRequestWhereUniqueInput[];
    delete?: Prisma.ServiceRequestWhereUniqueInput | Prisma.ServiceRequestWhereUniqueInput[];
    connect?: Prisma.ServiceRequestWhereUniqueInput | Prisma.ServiceRequestWhereUniqueInput[];
    update?: Prisma.ServiceRequestUpdateWithWhereUniqueWithoutUserInput | Prisma.ServiceRequestUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.ServiceRequestUpdateManyWithWhereWithoutUserInput | Prisma.ServiceRequestUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.ServiceRequestScalarWhereInput | Prisma.ServiceRequestScalarWhereInput[];
};
export type ServiceRequestUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ServiceRequestCreateWithoutUserInput, Prisma.ServiceRequestUncheckedCreateWithoutUserInput> | Prisma.ServiceRequestCreateWithoutUserInput[] | Prisma.ServiceRequestUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ServiceRequestCreateOrConnectWithoutUserInput | Prisma.ServiceRequestCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.ServiceRequestUpsertWithWhereUniqueWithoutUserInput | Prisma.ServiceRequestUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.ServiceRequestCreateManyUserInputEnvelope;
    set?: Prisma.ServiceRequestWhereUniqueInput | Prisma.ServiceRequestWhereUniqueInput[];
    disconnect?: Prisma.ServiceRequestWhereUniqueInput | Prisma.ServiceRequestWhereUniqueInput[];
    delete?: Prisma.ServiceRequestWhereUniqueInput | Prisma.ServiceRequestWhereUniqueInput[];
    connect?: Prisma.ServiceRequestWhereUniqueInput | Prisma.ServiceRequestWhereUniqueInput[];
    update?: Prisma.ServiceRequestUpdateWithWhereUniqueWithoutUserInput | Prisma.ServiceRequestUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.ServiceRequestUpdateManyWithWhereWithoutUserInput | Prisma.ServiceRequestUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.ServiceRequestScalarWhereInput | Prisma.ServiceRequestScalarWhereInput[];
};
export type EnumServiceRequestStatusFieldUpdateOperationsInput = {
    set?: $Enums.ServiceRequestStatus;
};
export type ServiceRequestCreateNestedOneWithoutBookingInput = {
    create?: Prisma.XOR<Prisma.ServiceRequestCreateWithoutBookingInput, Prisma.ServiceRequestUncheckedCreateWithoutBookingInput>;
    connectOrCreate?: Prisma.ServiceRequestCreateOrConnectWithoutBookingInput;
    connect?: Prisma.ServiceRequestWhereUniqueInput;
};
export type ServiceRequestUpdateOneRequiredWithoutBookingNestedInput = {
    create?: Prisma.XOR<Prisma.ServiceRequestCreateWithoutBookingInput, Prisma.ServiceRequestUncheckedCreateWithoutBookingInput>;
    connectOrCreate?: Prisma.ServiceRequestCreateOrConnectWithoutBookingInput;
    upsert?: Prisma.ServiceRequestUpsertWithoutBookingInput;
    connect?: Prisma.ServiceRequestWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ServiceRequestUpdateToOneWithWhereWithoutBookingInput, Prisma.ServiceRequestUpdateWithoutBookingInput>, Prisma.ServiceRequestUncheckedUpdateWithoutBookingInput>;
};
export type ServiceRequestCreateNestedOneWithoutApprovalInput = {
    create?: Prisma.XOR<Prisma.ServiceRequestCreateWithoutApprovalInput, Prisma.ServiceRequestUncheckedCreateWithoutApprovalInput>;
    connectOrCreate?: Prisma.ServiceRequestCreateOrConnectWithoutApprovalInput;
    connect?: Prisma.ServiceRequestWhereUniqueInput;
};
export type ServiceRequestUpdateOneRequiredWithoutApprovalNestedInput = {
    create?: Prisma.XOR<Prisma.ServiceRequestCreateWithoutApprovalInput, Prisma.ServiceRequestUncheckedCreateWithoutApprovalInput>;
    connectOrCreate?: Prisma.ServiceRequestCreateOrConnectWithoutApprovalInput;
    upsert?: Prisma.ServiceRequestUpsertWithoutApprovalInput;
    connect?: Prisma.ServiceRequestWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ServiceRequestUpdateToOneWithWhereWithoutApprovalInput, Prisma.ServiceRequestUpdateWithoutApprovalInput>, Prisma.ServiceRequestUncheckedUpdateWithoutApprovalInput>;
};
export type ServiceRequestCreateNestedOneWithoutAuditEventsInput = {
    create?: Prisma.XOR<Prisma.ServiceRequestCreateWithoutAuditEventsInput, Prisma.ServiceRequestUncheckedCreateWithoutAuditEventsInput>;
    connectOrCreate?: Prisma.ServiceRequestCreateOrConnectWithoutAuditEventsInput;
    connect?: Prisma.ServiceRequestWhereUniqueInput;
};
export type ServiceRequestUpdateOneRequiredWithoutAuditEventsNestedInput = {
    create?: Prisma.XOR<Prisma.ServiceRequestCreateWithoutAuditEventsInput, Prisma.ServiceRequestUncheckedCreateWithoutAuditEventsInput>;
    connectOrCreate?: Prisma.ServiceRequestCreateOrConnectWithoutAuditEventsInput;
    upsert?: Prisma.ServiceRequestUpsertWithoutAuditEventsInput;
    connect?: Prisma.ServiceRequestWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ServiceRequestUpdateToOneWithWhereWithoutAuditEventsInput, Prisma.ServiceRequestUpdateWithoutAuditEventsInput>, Prisma.ServiceRequestUncheckedUpdateWithoutAuditEventsInput>;
};
export type ServiceRequestCreateWithoutInstitutionInput = {
    id?: string;
    message: string;
    intent?: string | null;
    status?: $Enums.ServiceRequestStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutServiceRequestsInput;
    booking?: Prisma.BookingCreateNestedOneWithoutRequestInput;
    approval?: Prisma.ApprovalCreateNestedOneWithoutRequestInput;
    auditEvents?: Prisma.AuditEventCreateNestedManyWithoutRequestInput;
};
export type ServiceRequestUncheckedCreateWithoutInstitutionInput = {
    id?: string;
    userId: string;
    message: string;
    intent?: string | null;
    status?: $Enums.ServiceRequestStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    booking?: Prisma.BookingUncheckedCreateNestedOneWithoutRequestInput;
    approval?: Prisma.ApprovalUncheckedCreateNestedOneWithoutRequestInput;
    auditEvents?: Prisma.AuditEventUncheckedCreateNestedManyWithoutRequestInput;
};
export type ServiceRequestCreateOrConnectWithoutInstitutionInput = {
    where: Prisma.ServiceRequestWhereUniqueInput;
    create: Prisma.XOR<Prisma.ServiceRequestCreateWithoutInstitutionInput, Prisma.ServiceRequestUncheckedCreateWithoutInstitutionInput>;
};
export type ServiceRequestCreateManyInstitutionInputEnvelope = {
    data: Prisma.ServiceRequestCreateManyInstitutionInput | Prisma.ServiceRequestCreateManyInstitutionInput[];
    skipDuplicates?: boolean;
};
export type ServiceRequestUpsertWithWhereUniqueWithoutInstitutionInput = {
    where: Prisma.ServiceRequestWhereUniqueInput;
    update: Prisma.XOR<Prisma.ServiceRequestUpdateWithoutInstitutionInput, Prisma.ServiceRequestUncheckedUpdateWithoutInstitutionInput>;
    create: Prisma.XOR<Prisma.ServiceRequestCreateWithoutInstitutionInput, Prisma.ServiceRequestUncheckedCreateWithoutInstitutionInput>;
};
export type ServiceRequestUpdateWithWhereUniqueWithoutInstitutionInput = {
    where: Prisma.ServiceRequestWhereUniqueInput;
    data: Prisma.XOR<Prisma.ServiceRequestUpdateWithoutInstitutionInput, Prisma.ServiceRequestUncheckedUpdateWithoutInstitutionInput>;
};
export type ServiceRequestUpdateManyWithWhereWithoutInstitutionInput = {
    where: Prisma.ServiceRequestScalarWhereInput;
    data: Prisma.XOR<Prisma.ServiceRequestUpdateManyMutationInput, Prisma.ServiceRequestUncheckedUpdateManyWithoutInstitutionInput>;
};
export type ServiceRequestScalarWhereInput = {
    AND?: Prisma.ServiceRequestScalarWhereInput | Prisma.ServiceRequestScalarWhereInput[];
    OR?: Prisma.ServiceRequestScalarWhereInput[];
    NOT?: Prisma.ServiceRequestScalarWhereInput | Prisma.ServiceRequestScalarWhereInput[];
    id?: Prisma.StringFilter<"ServiceRequest"> | string;
    institutionId?: Prisma.StringFilter<"ServiceRequest"> | string;
    userId?: Prisma.StringFilter<"ServiceRequest"> | string;
    message?: Prisma.StringFilter<"ServiceRequest"> | string;
    intent?: Prisma.StringNullableFilter<"ServiceRequest"> | string | null;
    status?: Prisma.EnumServiceRequestStatusFilter<"ServiceRequest"> | $Enums.ServiceRequestStatus;
    createdAt?: Prisma.DateTimeFilter<"ServiceRequest"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ServiceRequest"> | Date | string;
};
export type ServiceRequestCreateWithoutUserInput = {
    id?: string;
    message: string;
    intent?: string | null;
    status?: $Enums.ServiceRequestStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    institution: Prisma.InstitutionCreateNestedOneWithoutServiceRequestsInput;
    booking?: Prisma.BookingCreateNestedOneWithoutRequestInput;
    approval?: Prisma.ApprovalCreateNestedOneWithoutRequestInput;
    auditEvents?: Prisma.AuditEventCreateNestedManyWithoutRequestInput;
};
export type ServiceRequestUncheckedCreateWithoutUserInput = {
    id?: string;
    institutionId: string;
    message: string;
    intent?: string | null;
    status?: $Enums.ServiceRequestStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    booking?: Prisma.BookingUncheckedCreateNestedOneWithoutRequestInput;
    approval?: Prisma.ApprovalUncheckedCreateNestedOneWithoutRequestInput;
    auditEvents?: Prisma.AuditEventUncheckedCreateNestedManyWithoutRequestInput;
};
export type ServiceRequestCreateOrConnectWithoutUserInput = {
    where: Prisma.ServiceRequestWhereUniqueInput;
    create: Prisma.XOR<Prisma.ServiceRequestCreateWithoutUserInput, Prisma.ServiceRequestUncheckedCreateWithoutUserInput>;
};
export type ServiceRequestCreateManyUserInputEnvelope = {
    data: Prisma.ServiceRequestCreateManyUserInput | Prisma.ServiceRequestCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type ServiceRequestUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.ServiceRequestWhereUniqueInput;
    update: Prisma.XOR<Prisma.ServiceRequestUpdateWithoutUserInput, Prisma.ServiceRequestUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.ServiceRequestCreateWithoutUserInput, Prisma.ServiceRequestUncheckedCreateWithoutUserInput>;
};
export type ServiceRequestUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.ServiceRequestWhereUniqueInput;
    data: Prisma.XOR<Prisma.ServiceRequestUpdateWithoutUserInput, Prisma.ServiceRequestUncheckedUpdateWithoutUserInput>;
};
export type ServiceRequestUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.ServiceRequestScalarWhereInput;
    data: Prisma.XOR<Prisma.ServiceRequestUpdateManyMutationInput, Prisma.ServiceRequestUncheckedUpdateManyWithoutUserInput>;
};
export type ServiceRequestCreateWithoutBookingInput = {
    id?: string;
    message: string;
    intent?: string | null;
    status?: $Enums.ServiceRequestStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    institution: Prisma.InstitutionCreateNestedOneWithoutServiceRequestsInput;
    user: Prisma.UserCreateNestedOneWithoutServiceRequestsInput;
    approval?: Prisma.ApprovalCreateNestedOneWithoutRequestInput;
    auditEvents?: Prisma.AuditEventCreateNestedManyWithoutRequestInput;
};
export type ServiceRequestUncheckedCreateWithoutBookingInput = {
    id?: string;
    institutionId: string;
    userId: string;
    message: string;
    intent?: string | null;
    status?: $Enums.ServiceRequestStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    approval?: Prisma.ApprovalUncheckedCreateNestedOneWithoutRequestInput;
    auditEvents?: Prisma.AuditEventUncheckedCreateNestedManyWithoutRequestInput;
};
export type ServiceRequestCreateOrConnectWithoutBookingInput = {
    where: Prisma.ServiceRequestWhereUniqueInput;
    create: Prisma.XOR<Prisma.ServiceRequestCreateWithoutBookingInput, Prisma.ServiceRequestUncheckedCreateWithoutBookingInput>;
};
export type ServiceRequestUpsertWithoutBookingInput = {
    update: Prisma.XOR<Prisma.ServiceRequestUpdateWithoutBookingInput, Prisma.ServiceRequestUncheckedUpdateWithoutBookingInput>;
    create: Prisma.XOR<Prisma.ServiceRequestCreateWithoutBookingInput, Prisma.ServiceRequestUncheckedCreateWithoutBookingInput>;
    where?: Prisma.ServiceRequestWhereInput;
};
export type ServiceRequestUpdateToOneWithWhereWithoutBookingInput = {
    where?: Prisma.ServiceRequestWhereInput;
    data: Prisma.XOR<Prisma.ServiceRequestUpdateWithoutBookingInput, Prisma.ServiceRequestUncheckedUpdateWithoutBookingInput>;
};
export type ServiceRequestUpdateWithoutBookingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    intent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumServiceRequestStatusFieldUpdateOperationsInput | $Enums.ServiceRequestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    institution?: Prisma.InstitutionUpdateOneRequiredWithoutServiceRequestsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutServiceRequestsNestedInput;
    approval?: Prisma.ApprovalUpdateOneWithoutRequestNestedInput;
    auditEvents?: Prisma.AuditEventUpdateManyWithoutRequestNestedInput;
};
export type ServiceRequestUncheckedUpdateWithoutBookingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    institutionId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    intent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumServiceRequestStatusFieldUpdateOperationsInput | $Enums.ServiceRequestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approval?: Prisma.ApprovalUncheckedUpdateOneWithoutRequestNestedInput;
    auditEvents?: Prisma.AuditEventUncheckedUpdateManyWithoutRequestNestedInput;
};
export type ServiceRequestCreateWithoutApprovalInput = {
    id?: string;
    message: string;
    intent?: string | null;
    status?: $Enums.ServiceRequestStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    institution: Prisma.InstitutionCreateNestedOneWithoutServiceRequestsInput;
    user: Prisma.UserCreateNestedOneWithoutServiceRequestsInput;
    booking?: Prisma.BookingCreateNestedOneWithoutRequestInput;
    auditEvents?: Prisma.AuditEventCreateNestedManyWithoutRequestInput;
};
export type ServiceRequestUncheckedCreateWithoutApprovalInput = {
    id?: string;
    institutionId: string;
    userId: string;
    message: string;
    intent?: string | null;
    status?: $Enums.ServiceRequestStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    booking?: Prisma.BookingUncheckedCreateNestedOneWithoutRequestInput;
    auditEvents?: Prisma.AuditEventUncheckedCreateNestedManyWithoutRequestInput;
};
export type ServiceRequestCreateOrConnectWithoutApprovalInput = {
    where: Prisma.ServiceRequestWhereUniqueInput;
    create: Prisma.XOR<Prisma.ServiceRequestCreateWithoutApprovalInput, Prisma.ServiceRequestUncheckedCreateWithoutApprovalInput>;
};
export type ServiceRequestUpsertWithoutApprovalInput = {
    update: Prisma.XOR<Prisma.ServiceRequestUpdateWithoutApprovalInput, Prisma.ServiceRequestUncheckedUpdateWithoutApprovalInput>;
    create: Prisma.XOR<Prisma.ServiceRequestCreateWithoutApprovalInput, Prisma.ServiceRequestUncheckedCreateWithoutApprovalInput>;
    where?: Prisma.ServiceRequestWhereInput;
};
export type ServiceRequestUpdateToOneWithWhereWithoutApprovalInput = {
    where?: Prisma.ServiceRequestWhereInput;
    data: Prisma.XOR<Prisma.ServiceRequestUpdateWithoutApprovalInput, Prisma.ServiceRequestUncheckedUpdateWithoutApprovalInput>;
};
export type ServiceRequestUpdateWithoutApprovalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    intent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumServiceRequestStatusFieldUpdateOperationsInput | $Enums.ServiceRequestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    institution?: Prisma.InstitutionUpdateOneRequiredWithoutServiceRequestsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutServiceRequestsNestedInput;
    booking?: Prisma.BookingUpdateOneWithoutRequestNestedInput;
    auditEvents?: Prisma.AuditEventUpdateManyWithoutRequestNestedInput;
};
export type ServiceRequestUncheckedUpdateWithoutApprovalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    institutionId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    intent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumServiceRequestStatusFieldUpdateOperationsInput | $Enums.ServiceRequestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    booking?: Prisma.BookingUncheckedUpdateOneWithoutRequestNestedInput;
    auditEvents?: Prisma.AuditEventUncheckedUpdateManyWithoutRequestNestedInput;
};
export type ServiceRequestCreateWithoutAuditEventsInput = {
    id?: string;
    message: string;
    intent?: string | null;
    status?: $Enums.ServiceRequestStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    institution: Prisma.InstitutionCreateNestedOneWithoutServiceRequestsInput;
    user: Prisma.UserCreateNestedOneWithoutServiceRequestsInput;
    booking?: Prisma.BookingCreateNestedOneWithoutRequestInput;
    approval?: Prisma.ApprovalCreateNestedOneWithoutRequestInput;
};
export type ServiceRequestUncheckedCreateWithoutAuditEventsInput = {
    id?: string;
    institutionId: string;
    userId: string;
    message: string;
    intent?: string | null;
    status?: $Enums.ServiceRequestStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    booking?: Prisma.BookingUncheckedCreateNestedOneWithoutRequestInput;
    approval?: Prisma.ApprovalUncheckedCreateNestedOneWithoutRequestInput;
};
export type ServiceRequestCreateOrConnectWithoutAuditEventsInput = {
    where: Prisma.ServiceRequestWhereUniqueInput;
    create: Prisma.XOR<Prisma.ServiceRequestCreateWithoutAuditEventsInput, Prisma.ServiceRequestUncheckedCreateWithoutAuditEventsInput>;
};
export type ServiceRequestUpsertWithoutAuditEventsInput = {
    update: Prisma.XOR<Prisma.ServiceRequestUpdateWithoutAuditEventsInput, Prisma.ServiceRequestUncheckedUpdateWithoutAuditEventsInput>;
    create: Prisma.XOR<Prisma.ServiceRequestCreateWithoutAuditEventsInput, Prisma.ServiceRequestUncheckedCreateWithoutAuditEventsInput>;
    where?: Prisma.ServiceRequestWhereInput;
};
export type ServiceRequestUpdateToOneWithWhereWithoutAuditEventsInput = {
    where?: Prisma.ServiceRequestWhereInput;
    data: Prisma.XOR<Prisma.ServiceRequestUpdateWithoutAuditEventsInput, Prisma.ServiceRequestUncheckedUpdateWithoutAuditEventsInput>;
};
export type ServiceRequestUpdateWithoutAuditEventsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    intent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumServiceRequestStatusFieldUpdateOperationsInput | $Enums.ServiceRequestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    institution?: Prisma.InstitutionUpdateOneRequiredWithoutServiceRequestsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutServiceRequestsNestedInput;
    booking?: Prisma.BookingUpdateOneWithoutRequestNestedInput;
    approval?: Prisma.ApprovalUpdateOneWithoutRequestNestedInput;
};
export type ServiceRequestUncheckedUpdateWithoutAuditEventsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    institutionId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    intent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumServiceRequestStatusFieldUpdateOperationsInput | $Enums.ServiceRequestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    booking?: Prisma.BookingUncheckedUpdateOneWithoutRequestNestedInput;
    approval?: Prisma.ApprovalUncheckedUpdateOneWithoutRequestNestedInput;
};
export type ServiceRequestCreateManyInstitutionInput = {
    id?: string;
    userId: string;
    message: string;
    intent?: string | null;
    status?: $Enums.ServiceRequestStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ServiceRequestUpdateWithoutInstitutionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    intent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumServiceRequestStatusFieldUpdateOperationsInput | $Enums.ServiceRequestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutServiceRequestsNestedInput;
    booking?: Prisma.BookingUpdateOneWithoutRequestNestedInput;
    approval?: Prisma.ApprovalUpdateOneWithoutRequestNestedInput;
    auditEvents?: Prisma.AuditEventUpdateManyWithoutRequestNestedInput;
};
export type ServiceRequestUncheckedUpdateWithoutInstitutionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    intent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumServiceRequestStatusFieldUpdateOperationsInput | $Enums.ServiceRequestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    booking?: Prisma.BookingUncheckedUpdateOneWithoutRequestNestedInput;
    approval?: Prisma.ApprovalUncheckedUpdateOneWithoutRequestNestedInput;
    auditEvents?: Prisma.AuditEventUncheckedUpdateManyWithoutRequestNestedInput;
};
export type ServiceRequestUncheckedUpdateManyWithoutInstitutionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    intent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumServiceRequestStatusFieldUpdateOperationsInput | $Enums.ServiceRequestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ServiceRequestCreateManyUserInput = {
    id?: string;
    institutionId: string;
    message: string;
    intent?: string | null;
    status?: $Enums.ServiceRequestStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ServiceRequestUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    intent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumServiceRequestStatusFieldUpdateOperationsInput | $Enums.ServiceRequestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    institution?: Prisma.InstitutionUpdateOneRequiredWithoutServiceRequestsNestedInput;
    booking?: Prisma.BookingUpdateOneWithoutRequestNestedInput;
    approval?: Prisma.ApprovalUpdateOneWithoutRequestNestedInput;
    auditEvents?: Prisma.AuditEventUpdateManyWithoutRequestNestedInput;
};
export type ServiceRequestUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    institutionId?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    intent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumServiceRequestStatusFieldUpdateOperationsInput | $Enums.ServiceRequestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    booking?: Prisma.BookingUncheckedUpdateOneWithoutRequestNestedInput;
    approval?: Prisma.ApprovalUncheckedUpdateOneWithoutRequestNestedInput;
    auditEvents?: Prisma.AuditEventUncheckedUpdateManyWithoutRequestNestedInput;
};
export type ServiceRequestUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    institutionId?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    intent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumServiceRequestStatusFieldUpdateOperationsInput | $Enums.ServiceRequestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ServiceRequestCountOutputType = {
    auditEvents: number;
};
export type ServiceRequestCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    auditEvents?: boolean | ServiceRequestCountOutputTypeCountAuditEventsArgs;
};
export type ServiceRequestCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ServiceRequestCountOutputTypeSelect<ExtArgs> | null;
};
export type ServiceRequestCountOutputTypeCountAuditEventsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AuditEventWhereInput;
};
export type ServiceRequestSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    institutionId?: boolean;
    userId?: boolean;
    message?: boolean;
    intent?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    institution?: boolean | Prisma.InstitutionDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    booking?: boolean | Prisma.ServiceRequest$bookingArgs<ExtArgs>;
    approval?: boolean | Prisma.ServiceRequest$approvalArgs<ExtArgs>;
    auditEvents?: boolean | Prisma.ServiceRequest$auditEventsArgs<ExtArgs>;
    _count?: boolean | Prisma.ServiceRequestCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["serviceRequest"]>;
export type ServiceRequestSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    institutionId?: boolean;
    userId?: boolean;
    message?: boolean;
    intent?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    institution?: boolean | Prisma.InstitutionDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["serviceRequest"]>;
export type ServiceRequestSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    institutionId?: boolean;
    userId?: boolean;
    message?: boolean;
    intent?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    institution?: boolean | Prisma.InstitutionDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["serviceRequest"]>;
export type ServiceRequestSelectScalar = {
    id?: boolean;
    institutionId?: boolean;
    userId?: boolean;
    message?: boolean;
    intent?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ServiceRequestOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "institutionId" | "userId" | "message" | "intent" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["serviceRequest"]>;
export type ServiceRequestInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    institution?: boolean | Prisma.InstitutionDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    booking?: boolean | Prisma.ServiceRequest$bookingArgs<ExtArgs>;
    approval?: boolean | Prisma.ServiceRequest$approvalArgs<ExtArgs>;
    auditEvents?: boolean | Prisma.ServiceRequest$auditEventsArgs<ExtArgs>;
    _count?: boolean | Prisma.ServiceRequestCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ServiceRequestIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    institution?: boolean | Prisma.InstitutionDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type ServiceRequestIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    institution?: boolean | Prisma.InstitutionDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $ServiceRequestPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ServiceRequest";
    objects: {
        institution: Prisma.$InstitutionPayload<ExtArgs>;
        user: Prisma.$UserPayload<ExtArgs>;
        booking: Prisma.$BookingPayload<ExtArgs> | null;
        approval: Prisma.$ApprovalPayload<ExtArgs> | null;
        auditEvents: Prisma.$AuditEventPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        institutionId: string;
        userId: string;
        message: string;
        intent: string | null;
        status: $Enums.ServiceRequestStatus;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["serviceRequest"]>;
    composites: {};
};
export type ServiceRequestGetPayload<S extends boolean | null | undefined | ServiceRequestDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ServiceRequestPayload, S>;
export type ServiceRequestCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ServiceRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ServiceRequestCountAggregateInputType | true;
};
export interface ServiceRequestDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ServiceRequest'];
        meta: {
            name: 'ServiceRequest';
        };
    };
    findUnique<T extends ServiceRequestFindUniqueArgs>(args: Prisma.SelectSubset<T, ServiceRequestFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ServiceRequestClient<runtime.Types.Result.GetResult<Prisma.$ServiceRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ServiceRequestFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ServiceRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ServiceRequestClient<runtime.Types.Result.GetResult<Prisma.$ServiceRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ServiceRequestFindFirstArgs>(args?: Prisma.SelectSubset<T, ServiceRequestFindFirstArgs<ExtArgs>>): Prisma.Prisma__ServiceRequestClient<runtime.Types.Result.GetResult<Prisma.$ServiceRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ServiceRequestFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ServiceRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ServiceRequestClient<runtime.Types.Result.GetResult<Prisma.$ServiceRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ServiceRequestFindManyArgs>(args?: Prisma.SelectSubset<T, ServiceRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ServiceRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ServiceRequestCreateArgs>(args: Prisma.SelectSubset<T, ServiceRequestCreateArgs<ExtArgs>>): Prisma.Prisma__ServiceRequestClient<runtime.Types.Result.GetResult<Prisma.$ServiceRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ServiceRequestCreateManyArgs>(args?: Prisma.SelectSubset<T, ServiceRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ServiceRequestCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ServiceRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ServiceRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ServiceRequestDeleteArgs>(args: Prisma.SelectSubset<T, ServiceRequestDeleteArgs<ExtArgs>>): Prisma.Prisma__ServiceRequestClient<runtime.Types.Result.GetResult<Prisma.$ServiceRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ServiceRequestUpdateArgs>(args: Prisma.SelectSubset<T, ServiceRequestUpdateArgs<ExtArgs>>): Prisma.Prisma__ServiceRequestClient<runtime.Types.Result.GetResult<Prisma.$ServiceRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ServiceRequestDeleteManyArgs>(args?: Prisma.SelectSubset<T, ServiceRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ServiceRequestUpdateManyArgs>(args: Prisma.SelectSubset<T, ServiceRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ServiceRequestUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ServiceRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ServiceRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ServiceRequestUpsertArgs>(args: Prisma.SelectSubset<T, ServiceRequestUpsertArgs<ExtArgs>>): Prisma.Prisma__ServiceRequestClient<runtime.Types.Result.GetResult<Prisma.$ServiceRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ServiceRequestCountArgs>(args?: Prisma.Subset<T, ServiceRequestCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ServiceRequestCountAggregateOutputType> : number>;
    aggregate<T extends ServiceRequestAggregateArgs>(args: Prisma.Subset<T, ServiceRequestAggregateArgs>): Prisma.PrismaPromise<GetServiceRequestAggregateType<T>>;
    groupBy<T extends ServiceRequestGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ServiceRequestGroupByArgs['orderBy'];
    } : {
        orderBy?: ServiceRequestGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ServiceRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServiceRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ServiceRequestFieldRefs;
}
export interface Prisma__ServiceRequestClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    institution<T extends Prisma.InstitutionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.InstitutionDefaultArgs<ExtArgs>>): Prisma.Prisma__InstitutionClient<runtime.Types.Result.GetResult<Prisma.$InstitutionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    booking<T extends Prisma.ServiceRequest$bookingArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ServiceRequest$bookingArgs<ExtArgs>>): Prisma.Prisma__BookingClient<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    approval<T extends Prisma.ServiceRequest$approvalArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ServiceRequest$approvalArgs<ExtArgs>>): Prisma.Prisma__ApprovalClient<runtime.Types.Result.GetResult<Prisma.$ApprovalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    auditEvents<T extends Prisma.ServiceRequest$auditEventsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ServiceRequest$auditEventsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AuditEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ServiceRequestFieldRefs {
    readonly id: Prisma.FieldRef<"ServiceRequest", 'String'>;
    readonly institutionId: Prisma.FieldRef<"ServiceRequest", 'String'>;
    readonly userId: Prisma.FieldRef<"ServiceRequest", 'String'>;
    readonly message: Prisma.FieldRef<"ServiceRequest", 'String'>;
    readonly intent: Prisma.FieldRef<"ServiceRequest", 'String'>;
    readonly status: Prisma.FieldRef<"ServiceRequest", 'ServiceRequestStatus'>;
    readonly createdAt: Prisma.FieldRef<"ServiceRequest", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"ServiceRequest", 'DateTime'>;
}
export type ServiceRequestFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ServiceRequestSelect<ExtArgs> | null;
    omit?: Prisma.ServiceRequestOmit<ExtArgs> | null;
    include?: Prisma.ServiceRequestInclude<ExtArgs> | null;
    where: Prisma.ServiceRequestWhereUniqueInput;
};
export type ServiceRequestFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ServiceRequestSelect<ExtArgs> | null;
    omit?: Prisma.ServiceRequestOmit<ExtArgs> | null;
    include?: Prisma.ServiceRequestInclude<ExtArgs> | null;
    where: Prisma.ServiceRequestWhereUniqueInput;
};
export type ServiceRequestFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ServiceRequestFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ServiceRequestFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ServiceRequestCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ServiceRequestSelect<ExtArgs> | null;
    omit?: Prisma.ServiceRequestOmit<ExtArgs> | null;
    include?: Prisma.ServiceRequestInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ServiceRequestCreateInput, Prisma.ServiceRequestUncheckedCreateInput>;
};
export type ServiceRequestCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ServiceRequestCreateManyInput | Prisma.ServiceRequestCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ServiceRequestCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ServiceRequestSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ServiceRequestOmit<ExtArgs> | null;
    data: Prisma.ServiceRequestCreateManyInput | Prisma.ServiceRequestCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ServiceRequestIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ServiceRequestUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ServiceRequestSelect<ExtArgs> | null;
    omit?: Prisma.ServiceRequestOmit<ExtArgs> | null;
    include?: Prisma.ServiceRequestInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ServiceRequestUpdateInput, Prisma.ServiceRequestUncheckedUpdateInput>;
    where: Prisma.ServiceRequestWhereUniqueInput;
};
export type ServiceRequestUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ServiceRequestUpdateManyMutationInput, Prisma.ServiceRequestUncheckedUpdateManyInput>;
    where?: Prisma.ServiceRequestWhereInput;
    limit?: number;
};
export type ServiceRequestUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ServiceRequestSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ServiceRequestOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ServiceRequestUpdateManyMutationInput, Prisma.ServiceRequestUncheckedUpdateManyInput>;
    where?: Prisma.ServiceRequestWhereInput;
    limit?: number;
    include?: Prisma.ServiceRequestIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ServiceRequestUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ServiceRequestSelect<ExtArgs> | null;
    omit?: Prisma.ServiceRequestOmit<ExtArgs> | null;
    include?: Prisma.ServiceRequestInclude<ExtArgs> | null;
    where: Prisma.ServiceRequestWhereUniqueInput;
    create: Prisma.XOR<Prisma.ServiceRequestCreateInput, Prisma.ServiceRequestUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ServiceRequestUpdateInput, Prisma.ServiceRequestUncheckedUpdateInput>;
};
export type ServiceRequestDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ServiceRequestSelect<ExtArgs> | null;
    omit?: Prisma.ServiceRequestOmit<ExtArgs> | null;
    include?: Prisma.ServiceRequestInclude<ExtArgs> | null;
    where: Prisma.ServiceRequestWhereUniqueInput;
};
export type ServiceRequestDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ServiceRequestWhereInput;
    limit?: number;
};
export type ServiceRequest$bookingArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingSelect<ExtArgs> | null;
    omit?: Prisma.BookingOmit<ExtArgs> | null;
    include?: Prisma.BookingInclude<ExtArgs> | null;
    where?: Prisma.BookingWhereInput;
};
export type ServiceRequest$approvalArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ApprovalSelect<ExtArgs> | null;
    omit?: Prisma.ApprovalOmit<ExtArgs> | null;
    include?: Prisma.ApprovalInclude<ExtArgs> | null;
    where?: Prisma.ApprovalWhereInput;
};
export type ServiceRequest$auditEventsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ServiceRequestDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ServiceRequestSelect<ExtArgs> | null;
    omit?: Prisma.ServiceRequestOmit<ExtArgs> | null;
    include?: Prisma.ServiceRequestInclude<ExtArgs> | null;
};
export {};
