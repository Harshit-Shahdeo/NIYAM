import type * as runtime from "@prisma/client/runtime/library";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ApprovalModel = runtime.Types.Result.DefaultSelection<Prisma.$ApprovalPayload>;
export type AggregateApproval = {
    _count: ApprovalCountAggregateOutputType | null;
    _min: ApprovalMinAggregateOutputType | null;
    _max: ApprovalMaxAggregateOutputType | null;
};
export type ApprovalMinAggregateOutputType = {
    id: string | null;
    institutionId: string | null;
    requestId: string | null;
    approverId: string | null;
    status: $Enums.ApprovalStatus | null;
    reason: string | null;
    resolvedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ApprovalMaxAggregateOutputType = {
    id: string | null;
    institutionId: string | null;
    requestId: string | null;
    approverId: string | null;
    status: $Enums.ApprovalStatus | null;
    reason: string | null;
    resolvedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ApprovalCountAggregateOutputType = {
    id: number;
    institutionId: number;
    requestId: number;
    approverId: number;
    status: number;
    reason: number;
    resolvedAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ApprovalMinAggregateInputType = {
    id?: true;
    institutionId?: true;
    requestId?: true;
    approverId?: true;
    status?: true;
    reason?: true;
    resolvedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ApprovalMaxAggregateInputType = {
    id?: true;
    institutionId?: true;
    requestId?: true;
    approverId?: true;
    status?: true;
    reason?: true;
    resolvedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ApprovalCountAggregateInputType = {
    id?: true;
    institutionId?: true;
    requestId?: true;
    approverId?: true;
    status?: true;
    reason?: true;
    resolvedAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ApprovalAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ApprovalWhereInput;
    orderBy?: Prisma.ApprovalOrderByWithRelationInput | Prisma.ApprovalOrderByWithRelationInput[];
    cursor?: Prisma.ApprovalWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ApprovalCountAggregateInputType;
    _min?: ApprovalMinAggregateInputType;
    _max?: ApprovalMaxAggregateInputType;
};
export type GetApprovalAggregateType<T extends ApprovalAggregateArgs> = {
    [P in keyof T & keyof AggregateApproval]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateApproval[P]> : Prisma.GetScalarType<T[P], AggregateApproval[P]>;
};
export type ApprovalGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ApprovalWhereInput;
    orderBy?: Prisma.ApprovalOrderByWithAggregationInput | Prisma.ApprovalOrderByWithAggregationInput[];
    by: Prisma.ApprovalScalarFieldEnum[] | Prisma.ApprovalScalarFieldEnum;
    having?: Prisma.ApprovalScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ApprovalCountAggregateInputType | true;
    _min?: ApprovalMinAggregateInputType;
    _max?: ApprovalMaxAggregateInputType;
};
export type ApprovalGroupByOutputType = {
    id: string;
    institutionId: string;
    requestId: string;
    approverId: string | null;
    status: $Enums.ApprovalStatus;
    reason: string | null;
    resolvedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: ApprovalCountAggregateOutputType | null;
    _min: ApprovalMinAggregateOutputType | null;
    _max: ApprovalMaxAggregateOutputType | null;
};
type GetApprovalGroupByPayload<T extends ApprovalGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ApprovalGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ApprovalGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ApprovalGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ApprovalGroupByOutputType[P]>;
}>>;
export type ApprovalWhereInput = {
    AND?: Prisma.ApprovalWhereInput | Prisma.ApprovalWhereInput[];
    OR?: Prisma.ApprovalWhereInput[];
    NOT?: Prisma.ApprovalWhereInput | Prisma.ApprovalWhereInput[];
    id?: Prisma.StringFilter<"Approval"> | string;
    institutionId?: Prisma.StringFilter<"Approval"> | string;
    requestId?: Prisma.StringFilter<"Approval"> | string;
    approverId?: Prisma.StringNullableFilter<"Approval"> | string | null;
    status?: Prisma.EnumApprovalStatusFilter<"Approval"> | $Enums.ApprovalStatus;
    reason?: Prisma.StringNullableFilter<"Approval"> | string | null;
    resolvedAt?: Prisma.DateTimeNullableFilter<"Approval"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Approval"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Approval"> | Date | string;
    institution?: Prisma.XOR<Prisma.InstitutionScalarRelationFilter, Prisma.InstitutionWhereInput>;
    request?: Prisma.XOR<Prisma.ServiceRequestScalarRelationFilter, Prisma.ServiceRequestWhereInput>;
    approver?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
};
export type ApprovalOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    institutionId?: Prisma.SortOrder;
    requestId?: Prisma.SortOrder;
    approverId?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reason?: Prisma.SortOrderInput | Prisma.SortOrder;
    resolvedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    institution?: Prisma.InstitutionOrderByWithRelationInput;
    request?: Prisma.ServiceRequestOrderByWithRelationInput;
    approver?: Prisma.UserOrderByWithRelationInput;
};
export type ApprovalWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    requestId?: string;
    AND?: Prisma.ApprovalWhereInput | Prisma.ApprovalWhereInput[];
    OR?: Prisma.ApprovalWhereInput[];
    NOT?: Prisma.ApprovalWhereInput | Prisma.ApprovalWhereInput[];
    institutionId?: Prisma.StringFilter<"Approval"> | string;
    approverId?: Prisma.StringNullableFilter<"Approval"> | string | null;
    status?: Prisma.EnumApprovalStatusFilter<"Approval"> | $Enums.ApprovalStatus;
    reason?: Prisma.StringNullableFilter<"Approval"> | string | null;
    resolvedAt?: Prisma.DateTimeNullableFilter<"Approval"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Approval"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Approval"> | Date | string;
    institution?: Prisma.XOR<Prisma.InstitutionScalarRelationFilter, Prisma.InstitutionWhereInput>;
    request?: Prisma.XOR<Prisma.ServiceRequestScalarRelationFilter, Prisma.ServiceRequestWhereInput>;
    approver?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
}, "id" | "requestId">;
export type ApprovalOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    institutionId?: Prisma.SortOrder;
    requestId?: Prisma.SortOrder;
    approverId?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reason?: Prisma.SortOrderInput | Prisma.SortOrder;
    resolvedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ApprovalCountOrderByAggregateInput;
    _max?: Prisma.ApprovalMaxOrderByAggregateInput;
    _min?: Prisma.ApprovalMinOrderByAggregateInput;
};
export type ApprovalScalarWhereWithAggregatesInput = {
    AND?: Prisma.ApprovalScalarWhereWithAggregatesInput | Prisma.ApprovalScalarWhereWithAggregatesInput[];
    OR?: Prisma.ApprovalScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ApprovalScalarWhereWithAggregatesInput | Prisma.ApprovalScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Approval"> | string;
    institutionId?: Prisma.StringWithAggregatesFilter<"Approval"> | string;
    requestId?: Prisma.StringWithAggregatesFilter<"Approval"> | string;
    approverId?: Prisma.StringNullableWithAggregatesFilter<"Approval"> | string | null;
    status?: Prisma.EnumApprovalStatusWithAggregatesFilter<"Approval"> | $Enums.ApprovalStatus;
    reason?: Prisma.StringNullableWithAggregatesFilter<"Approval"> | string | null;
    resolvedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Approval"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Approval"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Approval"> | Date | string;
};
export type ApprovalCreateInput = {
    id?: string;
    status?: $Enums.ApprovalStatus;
    reason?: string | null;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    institution: Prisma.InstitutionCreateNestedOneWithoutApprovalsInput;
    request: Prisma.ServiceRequestCreateNestedOneWithoutApprovalInput;
    approver?: Prisma.UserCreateNestedOneWithoutApprovalsInput;
};
export type ApprovalUncheckedCreateInput = {
    id?: string;
    institutionId: string;
    requestId: string;
    approverId?: string | null;
    status?: $Enums.ApprovalStatus;
    reason?: string | null;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ApprovalUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    institution?: Prisma.InstitutionUpdateOneRequiredWithoutApprovalsNestedInput;
    request?: Prisma.ServiceRequestUpdateOneRequiredWithoutApprovalNestedInput;
    approver?: Prisma.UserUpdateOneWithoutApprovalsNestedInput;
};
export type ApprovalUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    institutionId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestId?: Prisma.StringFieldUpdateOperationsInput | string;
    approverId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ApprovalCreateManyInput = {
    id?: string;
    institutionId: string;
    requestId: string;
    approverId?: string | null;
    status?: $Enums.ApprovalStatus;
    reason?: string | null;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ApprovalUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ApprovalUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    institutionId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestId?: Prisma.StringFieldUpdateOperationsInput | string;
    approverId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ApprovalListRelationFilter = {
    every?: Prisma.ApprovalWhereInput;
    some?: Prisma.ApprovalWhereInput;
    none?: Prisma.ApprovalWhereInput;
};
export type ApprovalOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ApprovalNullableScalarRelationFilter = {
    is?: Prisma.ApprovalWhereInput | null;
    isNot?: Prisma.ApprovalWhereInput | null;
};
export type ApprovalCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    institutionId?: Prisma.SortOrder;
    requestId?: Prisma.SortOrder;
    approverId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    resolvedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ApprovalMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    institutionId?: Prisma.SortOrder;
    requestId?: Prisma.SortOrder;
    approverId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    resolvedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ApprovalMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    institutionId?: Prisma.SortOrder;
    requestId?: Prisma.SortOrder;
    approverId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    resolvedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ApprovalCreateNestedManyWithoutInstitutionInput = {
    create?: Prisma.XOR<Prisma.ApprovalCreateWithoutInstitutionInput, Prisma.ApprovalUncheckedCreateWithoutInstitutionInput> | Prisma.ApprovalCreateWithoutInstitutionInput[] | Prisma.ApprovalUncheckedCreateWithoutInstitutionInput[];
    connectOrCreate?: Prisma.ApprovalCreateOrConnectWithoutInstitutionInput | Prisma.ApprovalCreateOrConnectWithoutInstitutionInput[];
    createMany?: Prisma.ApprovalCreateManyInstitutionInputEnvelope;
    connect?: Prisma.ApprovalWhereUniqueInput | Prisma.ApprovalWhereUniqueInput[];
};
export type ApprovalUncheckedCreateNestedManyWithoutInstitutionInput = {
    create?: Prisma.XOR<Prisma.ApprovalCreateWithoutInstitutionInput, Prisma.ApprovalUncheckedCreateWithoutInstitutionInput> | Prisma.ApprovalCreateWithoutInstitutionInput[] | Prisma.ApprovalUncheckedCreateWithoutInstitutionInput[];
    connectOrCreate?: Prisma.ApprovalCreateOrConnectWithoutInstitutionInput | Prisma.ApprovalCreateOrConnectWithoutInstitutionInput[];
    createMany?: Prisma.ApprovalCreateManyInstitutionInputEnvelope;
    connect?: Prisma.ApprovalWhereUniqueInput | Prisma.ApprovalWhereUniqueInput[];
};
export type ApprovalUpdateManyWithoutInstitutionNestedInput = {
    create?: Prisma.XOR<Prisma.ApprovalCreateWithoutInstitutionInput, Prisma.ApprovalUncheckedCreateWithoutInstitutionInput> | Prisma.ApprovalCreateWithoutInstitutionInput[] | Prisma.ApprovalUncheckedCreateWithoutInstitutionInput[];
    connectOrCreate?: Prisma.ApprovalCreateOrConnectWithoutInstitutionInput | Prisma.ApprovalCreateOrConnectWithoutInstitutionInput[];
    upsert?: Prisma.ApprovalUpsertWithWhereUniqueWithoutInstitutionInput | Prisma.ApprovalUpsertWithWhereUniqueWithoutInstitutionInput[];
    createMany?: Prisma.ApprovalCreateManyInstitutionInputEnvelope;
    set?: Prisma.ApprovalWhereUniqueInput | Prisma.ApprovalWhereUniqueInput[];
    disconnect?: Prisma.ApprovalWhereUniqueInput | Prisma.ApprovalWhereUniqueInput[];
    delete?: Prisma.ApprovalWhereUniqueInput | Prisma.ApprovalWhereUniqueInput[];
    connect?: Prisma.ApprovalWhereUniqueInput | Prisma.ApprovalWhereUniqueInput[];
    update?: Prisma.ApprovalUpdateWithWhereUniqueWithoutInstitutionInput | Prisma.ApprovalUpdateWithWhereUniqueWithoutInstitutionInput[];
    updateMany?: Prisma.ApprovalUpdateManyWithWhereWithoutInstitutionInput | Prisma.ApprovalUpdateManyWithWhereWithoutInstitutionInput[];
    deleteMany?: Prisma.ApprovalScalarWhereInput | Prisma.ApprovalScalarWhereInput[];
};
export type ApprovalUncheckedUpdateManyWithoutInstitutionNestedInput = {
    create?: Prisma.XOR<Prisma.ApprovalCreateWithoutInstitutionInput, Prisma.ApprovalUncheckedCreateWithoutInstitutionInput> | Prisma.ApprovalCreateWithoutInstitutionInput[] | Prisma.ApprovalUncheckedCreateWithoutInstitutionInput[];
    connectOrCreate?: Prisma.ApprovalCreateOrConnectWithoutInstitutionInput | Prisma.ApprovalCreateOrConnectWithoutInstitutionInput[];
    upsert?: Prisma.ApprovalUpsertWithWhereUniqueWithoutInstitutionInput | Prisma.ApprovalUpsertWithWhereUniqueWithoutInstitutionInput[];
    createMany?: Prisma.ApprovalCreateManyInstitutionInputEnvelope;
    set?: Prisma.ApprovalWhereUniqueInput | Prisma.ApprovalWhereUniqueInput[];
    disconnect?: Prisma.ApprovalWhereUniqueInput | Prisma.ApprovalWhereUniqueInput[];
    delete?: Prisma.ApprovalWhereUniqueInput | Prisma.ApprovalWhereUniqueInput[];
    connect?: Prisma.ApprovalWhereUniqueInput | Prisma.ApprovalWhereUniqueInput[];
    update?: Prisma.ApprovalUpdateWithWhereUniqueWithoutInstitutionInput | Prisma.ApprovalUpdateWithWhereUniqueWithoutInstitutionInput[];
    updateMany?: Prisma.ApprovalUpdateManyWithWhereWithoutInstitutionInput | Prisma.ApprovalUpdateManyWithWhereWithoutInstitutionInput[];
    deleteMany?: Prisma.ApprovalScalarWhereInput | Prisma.ApprovalScalarWhereInput[];
};
export type ApprovalCreateNestedManyWithoutApproverInput = {
    create?: Prisma.XOR<Prisma.ApprovalCreateWithoutApproverInput, Prisma.ApprovalUncheckedCreateWithoutApproverInput> | Prisma.ApprovalCreateWithoutApproverInput[] | Prisma.ApprovalUncheckedCreateWithoutApproverInput[];
    connectOrCreate?: Prisma.ApprovalCreateOrConnectWithoutApproverInput | Prisma.ApprovalCreateOrConnectWithoutApproverInput[];
    createMany?: Prisma.ApprovalCreateManyApproverInputEnvelope;
    connect?: Prisma.ApprovalWhereUniqueInput | Prisma.ApprovalWhereUniqueInput[];
};
export type ApprovalUncheckedCreateNestedManyWithoutApproverInput = {
    create?: Prisma.XOR<Prisma.ApprovalCreateWithoutApproverInput, Prisma.ApprovalUncheckedCreateWithoutApproverInput> | Prisma.ApprovalCreateWithoutApproverInput[] | Prisma.ApprovalUncheckedCreateWithoutApproverInput[];
    connectOrCreate?: Prisma.ApprovalCreateOrConnectWithoutApproverInput | Prisma.ApprovalCreateOrConnectWithoutApproverInput[];
    createMany?: Prisma.ApprovalCreateManyApproverInputEnvelope;
    connect?: Prisma.ApprovalWhereUniqueInput | Prisma.ApprovalWhereUniqueInput[];
};
export type ApprovalUpdateManyWithoutApproverNestedInput = {
    create?: Prisma.XOR<Prisma.ApprovalCreateWithoutApproverInput, Prisma.ApprovalUncheckedCreateWithoutApproverInput> | Prisma.ApprovalCreateWithoutApproverInput[] | Prisma.ApprovalUncheckedCreateWithoutApproverInput[];
    connectOrCreate?: Prisma.ApprovalCreateOrConnectWithoutApproverInput | Prisma.ApprovalCreateOrConnectWithoutApproverInput[];
    upsert?: Prisma.ApprovalUpsertWithWhereUniqueWithoutApproverInput | Prisma.ApprovalUpsertWithWhereUniqueWithoutApproverInput[];
    createMany?: Prisma.ApprovalCreateManyApproverInputEnvelope;
    set?: Prisma.ApprovalWhereUniqueInput | Prisma.ApprovalWhereUniqueInput[];
    disconnect?: Prisma.ApprovalWhereUniqueInput | Prisma.ApprovalWhereUniqueInput[];
    delete?: Prisma.ApprovalWhereUniqueInput | Prisma.ApprovalWhereUniqueInput[];
    connect?: Prisma.ApprovalWhereUniqueInput | Prisma.ApprovalWhereUniqueInput[];
    update?: Prisma.ApprovalUpdateWithWhereUniqueWithoutApproverInput | Prisma.ApprovalUpdateWithWhereUniqueWithoutApproverInput[];
    updateMany?: Prisma.ApprovalUpdateManyWithWhereWithoutApproverInput | Prisma.ApprovalUpdateManyWithWhereWithoutApproverInput[];
    deleteMany?: Prisma.ApprovalScalarWhereInput | Prisma.ApprovalScalarWhereInput[];
};
export type ApprovalUncheckedUpdateManyWithoutApproverNestedInput = {
    create?: Prisma.XOR<Prisma.ApprovalCreateWithoutApproverInput, Prisma.ApprovalUncheckedCreateWithoutApproverInput> | Prisma.ApprovalCreateWithoutApproverInput[] | Prisma.ApprovalUncheckedCreateWithoutApproverInput[];
    connectOrCreate?: Prisma.ApprovalCreateOrConnectWithoutApproverInput | Prisma.ApprovalCreateOrConnectWithoutApproverInput[];
    upsert?: Prisma.ApprovalUpsertWithWhereUniqueWithoutApproverInput | Prisma.ApprovalUpsertWithWhereUniqueWithoutApproverInput[];
    createMany?: Prisma.ApprovalCreateManyApproverInputEnvelope;
    set?: Prisma.ApprovalWhereUniqueInput | Prisma.ApprovalWhereUniqueInput[];
    disconnect?: Prisma.ApprovalWhereUniqueInput | Prisma.ApprovalWhereUniqueInput[];
    delete?: Prisma.ApprovalWhereUniqueInput | Prisma.ApprovalWhereUniqueInput[];
    connect?: Prisma.ApprovalWhereUniqueInput | Prisma.ApprovalWhereUniqueInput[];
    update?: Prisma.ApprovalUpdateWithWhereUniqueWithoutApproverInput | Prisma.ApprovalUpdateWithWhereUniqueWithoutApproverInput[];
    updateMany?: Prisma.ApprovalUpdateManyWithWhereWithoutApproverInput | Prisma.ApprovalUpdateManyWithWhereWithoutApproverInput[];
    deleteMany?: Prisma.ApprovalScalarWhereInput | Prisma.ApprovalScalarWhereInput[];
};
export type ApprovalCreateNestedOneWithoutRequestInput = {
    create?: Prisma.XOR<Prisma.ApprovalCreateWithoutRequestInput, Prisma.ApprovalUncheckedCreateWithoutRequestInput>;
    connectOrCreate?: Prisma.ApprovalCreateOrConnectWithoutRequestInput;
    connect?: Prisma.ApprovalWhereUniqueInput;
};
export type ApprovalUncheckedCreateNestedOneWithoutRequestInput = {
    create?: Prisma.XOR<Prisma.ApprovalCreateWithoutRequestInput, Prisma.ApprovalUncheckedCreateWithoutRequestInput>;
    connectOrCreate?: Prisma.ApprovalCreateOrConnectWithoutRequestInput;
    connect?: Prisma.ApprovalWhereUniqueInput;
};
export type ApprovalUpdateOneWithoutRequestNestedInput = {
    create?: Prisma.XOR<Prisma.ApprovalCreateWithoutRequestInput, Prisma.ApprovalUncheckedCreateWithoutRequestInput>;
    connectOrCreate?: Prisma.ApprovalCreateOrConnectWithoutRequestInput;
    upsert?: Prisma.ApprovalUpsertWithoutRequestInput;
    disconnect?: Prisma.ApprovalWhereInput | boolean;
    delete?: Prisma.ApprovalWhereInput | boolean;
    connect?: Prisma.ApprovalWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ApprovalUpdateToOneWithWhereWithoutRequestInput, Prisma.ApprovalUpdateWithoutRequestInput>, Prisma.ApprovalUncheckedUpdateWithoutRequestInput>;
};
export type ApprovalUncheckedUpdateOneWithoutRequestNestedInput = {
    create?: Prisma.XOR<Prisma.ApprovalCreateWithoutRequestInput, Prisma.ApprovalUncheckedCreateWithoutRequestInput>;
    connectOrCreate?: Prisma.ApprovalCreateOrConnectWithoutRequestInput;
    upsert?: Prisma.ApprovalUpsertWithoutRequestInput;
    disconnect?: Prisma.ApprovalWhereInput | boolean;
    delete?: Prisma.ApprovalWhereInput | boolean;
    connect?: Prisma.ApprovalWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ApprovalUpdateToOneWithWhereWithoutRequestInput, Prisma.ApprovalUpdateWithoutRequestInput>, Prisma.ApprovalUncheckedUpdateWithoutRequestInput>;
};
export type EnumApprovalStatusFieldUpdateOperationsInput = {
    set?: $Enums.ApprovalStatus;
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type ApprovalCreateWithoutInstitutionInput = {
    id?: string;
    status?: $Enums.ApprovalStatus;
    reason?: string | null;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    request: Prisma.ServiceRequestCreateNestedOneWithoutApprovalInput;
    approver?: Prisma.UserCreateNestedOneWithoutApprovalsInput;
};
export type ApprovalUncheckedCreateWithoutInstitutionInput = {
    id?: string;
    requestId: string;
    approverId?: string | null;
    status?: $Enums.ApprovalStatus;
    reason?: string | null;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ApprovalCreateOrConnectWithoutInstitutionInput = {
    where: Prisma.ApprovalWhereUniqueInput;
    create: Prisma.XOR<Prisma.ApprovalCreateWithoutInstitutionInput, Prisma.ApprovalUncheckedCreateWithoutInstitutionInput>;
};
export type ApprovalCreateManyInstitutionInputEnvelope = {
    data: Prisma.ApprovalCreateManyInstitutionInput | Prisma.ApprovalCreateManyInstitutionInput[];
    skipDuplicates?: boolean;
};
export type ApprovalUpsertWithWhereUniqueWithoutInstitutionInput = {
    where: Prisma.ApprovalWhereUniqueInput;
    update: Prisma.XOR<Prisma.ApprovalUpdateWithoutInstitutionInput, Prisma.ApprovalUncheckedUpdateWithoutInstitutionInput>;
    create: Prisma.XOR<Prisma.ApprovalCreateWithoutInstitutionInput, Prisma.ApprovalUncheckedCreateWithoutInstitutionInput>;
};
export type ApprovalUpdateWithWhereUniqueWithoutInstitutionInput = {
    where: Prisma.ApprovalWhereUniqueInput;
    data: Prisma.XOR<Prisma.ApprovalUpdateWithoutInstitutionInput, Prisma.ApprovalUncheckedUpdateWithoutInstitutionInput>;
};
export type ApprovalUpdateManyWithWhereWithoutInstitutionInput = {
    where: Prisma.ApprovalScalarWhereInput;
    data: Prisma.XOR<Prisma.ApprovalUpdateManyMutationInput, Prisma.ApprovalUncheckedUpdateManyWithoutInstitutionInput>;
};
export type ApprovalScalarWhereInput = {
    AND?: Prisma.ApprovalScalarWhereInput | Prisma.ApprovalScalarWhereInput[];
    OR?: Prisma.ApprovalScalarWhereInput[];
    NOT?: Prisma.ApprovalScalarWhereInput | Prisma.ApprovalScalarWhereInput[];
    id?: Prisma.StringFilter<"Approval"> | string;
    institutionId?: Prisma.StringFilter<"Approval"> | string;
    requestId?: Prisma.StringFilter<"Approval"> | string;
    approverId?: Prisma.StringNullableFilter<"Approval"> | string | null;
    status?: Prisma.EnumApprovalStatusFilter<"Approval"> | $Enums.ApprovalStatus;
    reason?: Prisma.StringNullableFilter<"Approval"> | string | null;
    resolvedAt?: Prisma.DateTimeNullableFilter<"Approval"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Approval"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Approval"> | Date | string;
};
export type ApprovalCreateWithoutApproverInput = {
    id?: string;
    status?: $Enums.ApprovalStatus;
    reason?: string | null;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    institution: Prisma.InstitutionCreateNestedOneWithoutApprovalsInput;
    request: Prisma.ServiceRequestCreateNestedOneWithoutApprovalInput;
};
export type ApprovalUncheckedCreateWithoutApproverInput = {
    id?: string;
    institutionId: string;
    requestId: string;
    status?: $Enums.ApprovalStatus;
    reason?: string | null;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ApprovalCreateOrConnectWithoutApproverInput = {
    where: Prisma.ApprovalWhereUniqueInput;
    create: Prisma.XOR<Prisma.ApprovalCreateWithoutApproverInput, Prisma.ApprovalUncheckedCreateWithoutApproverInput>;
};
export type ApprovalCreateManyApproverInputEnvelope = {
    data: Prisma.ApprovalCreateManyApproverInput | Prisma.ApprovalCreateManyApproverInput[];
    skipDuplicates?: boolean;
};
export type ApprovalUpsertWithWhereUniqueWithoutApproverInput = {
    where: Prisma.ApprovalWhereUniqueInput;
    update: Prisma.XOR<Prisma.ApprovalUpdateWithoutApproverInput, Prisma.ApprovalUncheckedUpdateWithoutApproverInput>;
    create: Prisma.XOR<Prisma.ApprovalCreateWithoutApproverInput, Prisma.ApprovalUncheckedCreateWithoutApproverInput>;
};
export type ApprovalUpdateWithWhereUniqueWithoutApproverInput = {
    where: Prisma.ApprovalWhereUniqueInput;
    data: Prisma.XOR<Prisma.ApprovalUpdateWithoutApproverInput, Prisma.ApprovalUncheckedUpdateWithoutApproverInput>;
};
export type ApprovalUpdateManyWithWhereWithoutApproverInput = {
    where: Prisma.ApprovalScalarWhereInput;
    data: Prisma.XOR<Prisma.ApprovalUpdateManyMutationInput, Prisma.ApprovalUncheckedUpdateManyWithoutApproverInput>;
};
export type ApprovalCreateWithoutRequestInput = {
    id?: string;
    status?: $Enums.ApprovalStatus;
    reason?: string | null;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    institution: Prisma.InstitutionCreateNestedOneWithoutApprovalsInput;
    approver?: Prisma.UserCreateNestedOneWithoutApprovalsInput;
};
export type ApprovalUncheckedCreateWithoutRequestInput = {
    id?: string;
    institutionId: string;
    approverId?: string | null;
    status?: $Enums.ApprovalStatus;
    reason?: string | null;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ApprovalCreateOrConnectWithoutRequestInput = {
    where: Prisma.ApprovalWhereUniqueInput;
    create: Prisma.XOR<Prisma.ApprovalCreateWithoutRequestInput, Prisma.ApprovalUncheckedCreateWithoutRequestInput>;
};
export type ApprovalUpsertWithoutRequestInput = {
    update: Prisma.XOR<Prisma.ApprovalUpdateWithoutRequestInput, Prisma.ApprovalUncheckedUpdateWithoutRequestInput>;
    create: Prisma.XOR<Prisma.ApprovalCreateWithoutRequestInput, Prisma.ApprovalUncheckedCreateWithoutRequestInput>;
    where?: Prisma.ApprovalWhereInput;
};
export type ApprovalUpdateToOneWithWhereWithoutRequestInput = {
    where?: Prisma.ApprovalWhereInput;
    data: Prisma.XOR<Prisma.ApprovalUpdateWithoutRequestInput, Prisma.ApprovalUncheckedUpdateWithoutRequestInput>;
};
export type ApprovalUpdateWithoutRequestInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    institution?: Prisma.InstitutionUpdateOneRequiredWithoutApprovalsNestedInput;
    approver?: Prisma.UserUpdateOneWithoutApprovalsNestedInput;
};
export type ApprovalUncheckedUpdateWithoutRequestInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    institutionId?: Prisma.StringFieldUpdateOperationsInput | string;
    approverId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ApprovalCreateManyInstitutionInput = {
    id?: string;
    requestId: string;
    approverId?: string | null;
    status?: $Enums.ApprovalStatus;
    reason?: string | null;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ApprovalUpdateWithoutInstitutionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    request?: Prisma.ServiceRequestUpdateOneRequiredWithoutApprovalNestedInput;
    approver?: Prisma.UserUpdateOneWithoutApprovalsNestedInput;
};
export type ApprovalUncheckedUpdateWithoutInstitutionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestId?: Prisma.StringFieldUpdateOperationsInput | string;
    approverId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ApprovalUncheckedUpdateManyWithoutInstitutionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestId?: Prisma.StringFieldUpdateOperationsInput | string;
    approverId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ApprovalCreateManyApproverInput = {
    id?: string;
    institutionId: string;
    requestId: string;
    status?: $Enums.ApprovalStatus;
    reason?: string | null;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ApprovalUpdateWithoutApproverInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    institution?: Prisma.InstitutionUpdateOneRequiredWithoutApprovalsNestedInput;
    request?: Prisma.ServiceRequestUpdateOneRequiredWithoutApprovalNestedInput;
};
export type ApprovalUncheckedUpdateWithoutApproverInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    institutionId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ApprovalUncheckedUpdateManyWithoutApproverInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    institutionId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ApprovalSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    institutionId?: boolean;
    requestId?: boolean;
    approverId?: boolean;
    status?: boolean;
    reason?: boolean;
    resolvedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    institution?: boolean | Prisma.InstitutionDefaultArgs<ExtArgs>;
    request?: boolean | Prisma.ServiceRequestDefaultArgs<ExtArgs>;
    approver?: boolean | Prisma.Approval$approverArgs<ExtArgs>;
}, ExtArgs["result"]["approval"]>;
export type ApprovalSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    institutionId?: boolean;
    requestId?: boolean;
    approverId?: boolean;
    status?: boolean;
    reason?: boolean;
    resolvedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    institution?: boolean | Prisma.InstitutionDefaultArgs<ExtArgs>;
    request?: boolean | Prisma.ServiceRequestDefaultArgs<ExtArgs>;
    approver?: boolean | Prisma.Approval$approverArgs<ExtArgs>;
}, ExtArgs["result"]["approval"]>;
export type ApprovalSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    institutionId?: boolean;
    requestId?: boolean;
    approverId?: boolean;
    status?: boolean;
    reason?: boolean;
    resolvedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    institution?: boolean | Prisma.InstitutionDefaultArgs<ExtArgs>;
    request?: boolean | Prisma.ServiceRequestDefaultArgs<ExtArgs>;
    approver?: boolean | Prisma.Approval$approverArgs<ExtArgs>;
}, ExtArgs["result"]["approval"]>;
export type ApprovalSelectScalar = {
    id?: boolean;
    institutionId?: boolean;
    requestId?: boolean;
    approverId?: boolean;
    status?: boolean;
    reason?: boolean;
    resolvedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ApprovalOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "institutionId" | "requestId" | "approverId" | "status" | "reason" | "resolvedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["approval"]>;
export type ApprovalInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    institution?: boolean | Prisma.InstitutionDefaultArgs<ExtArgs>;
    request?: boolean | Prisma.ServiceRequestDefaultArgs<ExtArgs>;
    approver?: boolean | Prisma.Approval$approverArgs<ExtArgs>;
};
export type ApprovalIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    institution?: boolean | Prisma.InstitutionDefaultArgs<ExtArgs>;
    request?: boolean | Prisma.ServiceRequestDefaultArgs<ExtArgs>;
    approver?: boolean | Prisma.Approval$approverArgs<ExtArgs>;
};
export type ApprovalIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    institution?: boolean | Prisma.InstitutionDefaultArgs<ExtArgs>;
    request?: boolean | Prisma.ServiceRequestDefaultArgs<ExtArgs>;
    approver?: boolean | Prisma.Approval$approverArgs<ExtArgs>;
};
export type $ApprovalPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Approval";
    objects: {
        institution: Prisma.$InstitutionPayload<ExtArgs>;
        request: Prisma.$ServiceRequestPayload<ExtArgs>;
        approver: Prisma.$UserPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        institutionId: string;
        requestId: string;
        approverId: string | null;
        status: $Enums.ApprovalStatus;
        reason: string | null;
        resolvedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["approval"]>;
    composites: {};
};
export type ApprovalGetPayload<S extends boolean | null | undefined | ApprovalDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ApprovalPayload, S>;
export type ApprovalCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ApprovalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ApprovalCountAggregateInputType | true;
};
export interface ApprovalDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Approval'];
        meta: {
            name: 'Approval';
        };
    };
    findUnique<T extends ApprovalFindUniqueArgs>(args: Prisma.SelectSubset<T, ApprovalFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ApprovalClient<runtime.Types.Result.GetResult<Prisma.$ApprovalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ApprovalFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ApprovalFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ApprovalClient<runtime.Types.Result.GetResult<Prisma.$ApprovalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ApprovalFindFirstArgs>(args?: Prisma.SelectSubset<T, ApprovalFindFirstArgs<ExtArgs>>): Prisma.Prisma__ApprovalClient<runtime.Types.Result.GetResult<Prisma.$ApprovalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ApprovalFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ApprovalFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ApprovalClient<runtime.Types.Result.GetResult<Prisma.$ApprovalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ApprovalFindManyArgs>(args?: Prisma.SelectSubset<T, ApprovalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ApprovalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ApprovalCreateArgs>(args: Prisma.SelectSubset<T, ApprovalCreateArgs<ExtArgs>>): Prisma.Prisma__ApprovalClient<runtime.Types.Result.GetResult<Prisma.$ApprovalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ApprovalCreateManyArgs>(args?: Prisma.SelectSubset<T, ApprovalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ApprovalCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ApprovalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ApprovalPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ApprovalDeleteArgs>(args: Prisma.SelectSubset<T, ApprovalDeleteArgs<ExtArgs>>): Prisma.Prisma__ApprovalClient<runtime.Types.Result.GetResult<Prisma.$ApprovalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ApprovalUpdateArgs>(args: Prisma.SelectSubset<T, ApprovalUpdateArgs<ExtArgs>>): Prisma.Prisma__ApprovalClient<runtime.Types.Result.GetResult<Prisma.$ApprovalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ApprovalDeleteManyArgs>(args?: Prisma.SelectSubset<T, ApprovalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ApprovalUpdateManyArgs>(args: Prisma.SelectSubset<T, ApprovalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ApprovalUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ApprovalUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ApprovalPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ApprovalUpsertArgs>(args: Prisma.SelectSubset<T, ApprovalUpsertArgs<ExtArgs>>): Prisma.Prisma__ApprovalClient<runtime.Types.Result.GetResult<Prisma.$ApprovalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ApprovalCountArgs>(args?: Prisma.Subset<T, ApprovalCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ApprovalCountAggregateOutputType> : number>;
    aggregate<T extends ApprovalAggregateArgs>(args: Prisma.Subset<T, ApprovalAggregateArgs>): Prisma.PrismaPromise<GetApprovalAggregateType<T>>;
    groupBy<T extends ApprovalGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ApprovalGroupByArgs['orderBy'];
    } : {
        orderBy?: ApprovalGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ApprovalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetApprovalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ApprovalFieldRefs;
}
export interface Prisma__ApprovalClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    institution<T extends Prisma.InstitutionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.InstitutionDefaultArgs<ExtArgs>>): Prisma.Prisma__InstitutionClient<runtime.Types.Result.GetResult<Prisma.$InstitutionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    request<T extends Prisma.ServiceRequestDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ServiceRequestDefaultArgs<ExtArgs>>): Prisma.Prisma__ServiceRequestClient<runtime.Types.Result.GetResult<Prisma.$ServiceRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    approver<T extends Prisma.Approval$approverArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Approval$approverArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ApprovalFieldRefs {
    readonly id: Prisma.FieldRef<"Approval", 'String'>;
    readonly institutionId: Prisma.FieldRef<"Approval", 'String'>;
    readonly requestId: Prisma.FieldRef<"Approval", 'String'>;
    readonly approverId: Prisma.FieldRef<"Approval", 'String'>;
    readonly status: Prisma.FieldRef<"Approval", 'ApprovalStatus'>;
    readonly reason: Prisma.FieldRef<"Approval", 'String'>;
    readonly resolvedAt: Prisma.FieldRef<"Approval", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"Approval", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Approval", 'DateTime'>;
}
export type ApprovalFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ApprovalSelect<ExtArgs> | null;
    omit?: Prisma.ApprovalOmit<ExtArgs> | null;
    include?: Prisma.ApprovalInclude<ExtArgs> | null;
    where: Prisma.ApprovalWhereUniqueInput;
};
export type ApprovalFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ApprovalSelect<ExtArgs> | null;
    omit?: Prisma.ApprovalOmit<ExtArgs> | null;
    include?: Prisma.ApprovalInclude<ExtArgs> | null;
    where: Prisma.ApprovalWhereUniqueInput;
};
export type ApprovalFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ApprovalFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ApprovalFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ApprovalCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ApprovalSelect<ExtArgs> | null;
    omit?: Prisma.ApprovalOmit<ExtArgs> | null;
    include?: Prisma.ApprovalInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ApprovalCreateInput, Prisma.ApprovalUncheckedCreateInput>;
};
export type ApprovalCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ApprovalCreateManyInput | Prisma.ApprovalCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ApprovalCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ApprovalSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ApprovalOmit<ExtArgs> | null;
    data: Prisma.ApprovalCreateManyInput | Prisma.ApprovalCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ApprovalIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ApprovalUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ApprovalSelect<ExtArgs> | null;
    omit?: Prisma.ApprovalOmit<ExtArgs> | null;
    include?: Prisma.ApprovalInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ApprovalUpdateInput, Prisma.ApprovalUncheckedUpdateInput>;
    where: Prisma.ApprovalWhereUniqueInput;
};
export type ApprovalUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ApprovalUpdateManyMutationInput, Prisma.ApprovalUncheckedUpdateManyInput>;
    where?: Prisma.ApprovalWhereInput;
    limit?: number;
};
export type ApprovalUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ApprovalSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ApprovalOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ApprovalUpdateManyMutationInput, Prisma.ApprovalUncheckedUpdateManyInput>;
    where?: Prisma.ApprovalWhereInput;
    limit?: number;
    include?: Prisma.ApprovalIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ApprovalUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ApprovalSelect<ExtArgs> | null;
    omit?: Prisma.ApprovalOmit<ExtArgs> | null;
    include?: Prisma.ApprovalInclude<ExtArgs> | null;
    where: Prisma.ApprovalWhereUniqueInput;
    create: Prisma.XOR<Prisma.ApprovalCreateInput, Prisma.ApprovalUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ApprovalUpdateInput, Prisma.ApprovalUncheckedUpdateInput>;
};
export type ApprovalDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ApprovalSelect<ExtArgs> | null;
    omit?: Prisma.ApprovalOmit<ExtArgs> | null;
    include?: Prisma.ApprovalInclude<ExtArgs> | null;
    where: Prisma.ApprovalWhereUniqueInput;
};
export type ApprovalDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ApprovalWhereInput;
    limit?: number;
};
export type Approval$approverArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
export type ApprovalDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ApprovalSelect<ExtArgs> | null;
    omit?: Prisma.ApprovalOmit<ExtArgs> | null;
    include?: Prisma.ApprovalInclude<ExtArgs> | null;
};
export {};
