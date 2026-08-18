import type * as runtime from "@prisma/client/runtime/library";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type AuditEventModel = runtime.Types.Result.DefaultSelection<Prisma.$AuditEventPayload>;
export type AggregateAuditEvent = {
    _count: AuditEventCountAggregateOutputType | null;
    _min: AuditEventMinAggregateOutputType | null;
    _max: AuditEventMaxAggregateOutputType | null;
};
export type AuditEventMinAggregateOutputType = {
    id: string | null;
    institutionId: string | null;
    requestId: string | null;
    actorId: string | null;
    eventType: $Enums.AuditEventType | null;
    createdAt: Date | null;
};
export type AuditEventMaxAggregateOutputType = {
    id: string | null;
    institutionId: string | null;
    requestId: string | null;
    actorId: string | null;
    eventType: $Enums.AuditEventType | null;
    createdAt: Date | null;
};
export type AuditEventCountAggregateOutputType = {
    id: number;
    institutionId: number;
    requestId: number;
    actorId: number;
    eventType: number;
    metadata: number;
    createdAt: number;
    _all: number;
};
export type AuditEventMinAggregateInputType = {
    id?: true;
    institutionId?: true;
    requestId?: true;
    actorId?: true;
    eventType?: true;
    createdAt?: true;
};
export type AuditEventMaxAggregateInputType = {
    id?: true;
    institutionId?: true;
    requestId?: true;
    actorId?: true;
    eventType?: true;
    createdAt?: true;
};
export type AuditEventCountAggregateInputType = {
    id?: true;
    institutionId?: true;
    requestId?: true;
    actorId?: true;
    eventType?: true;
    metadata?: true;
    createdAt?: true;
    _all?: true;
};
export type AuditEventAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AuditEventWhereInput;
    orderBy?: Prisma.AuditEventOrderByWithRelationInput | Prisma.AuditEventOrderByWithRelationInput[];
    cursor?: Prisma.AuditEventWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | AuditEventCountAggregateInputType;
    _min?: AuditEventMinAggregateInputType;
    _max?: AuditEventMaxAggregateInputType;
};
export type GetAuditEventAggregateType<T extends AuditEventAggregateArgs> = {
    [P in keyof T & keyof AggregateAuditEvent]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAuditEvent[P]> : Prisma.GetScalarType<T[P], AggregateAuditEvent[P]>;
};
export type AuditEventGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AuditEventWhereInput;
    orderBy?: Prisma.AuditEventOrderByWithAggregationInput | Prisma.AuditEventOrderByWithAggregationInput[];
    by: Prisma.AuditEventScalarFieldEnum[] | Prisma.AuditEventScalarFieldEnum;
    having?: Prisma.AuditEventScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AuditEventCountAggregateInputType | true;
    _min?: AuditEventMinAggregateInputType;
    _max?: AuditEventMaxAggregateInputType;
};
export type AuditEventGroupByOutputType = {
    id: string;
    institutionId: string;
    requestId: string;
    actorId: string | null;
    eventType: $Enums.AuditEventType;
    metadata: runtime.JsonValue | null;
    createdAt: Date;
    _count: AuditEventCountAggregateOutputType | null;
    _min: AuditEventMinAggregateOutputType | null;
    _max: AuditEventMaxAggregateOutputType | null;
};
type GetAuditEventGroupByPayload<T extends AuditEventGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AuditEventGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AuditEventGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AuditEventGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AuditEventGroupByOutputType[P]>;
}>>;
export type AuditEventWhereInput = {
    AND?: Prisma.AuditEventWhereInput | Prisma.AuditEventWhereInput[];
    OR?: Prisma.AuditEventWhereInput[];
    NOT?: Prisma.AuditEventWhereInput | Prisma.AuditEventWhereInput[];
    id?: Prisma.StringFilter<"AuditEvent"> | string;
    institutionId?: Prisma.StringFilter<"AuditEvent"> | string;
    requestId?: Prisma.StringFilter<"AuditEvent"> | string;
    actorId?: Prisma.StringNullableFilter<"AuditEvent"> | string | null;
    eventType?: Prisma.EnumAuditEventTypeFilter<"AuditEvent"> | $Enums.AuditEventType;
    metadata?: Prisma.JsonNullableFilter<"AuditEvent">;
    createdAt?: Prisma.DateTimeFilter<"AuditEvent"> | Date | string;
    institution?: Prisma.XOR<Prisma.InstitutionScalarRelationFilter, Prisma.InstitutionWhereInput>;
    request?: Prisma.XOR<Prisma.ServiceRequestScalarRelationFilter, Prisma.ServiceRequestWhereInput>;
    actor?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
};
export type AuditEventOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    institutionId?: Prisma.SortOrder;
    requestId?: Prisma.SortOrder;
    actorId?: Prisma.SortOrderInput | Prisma.SortOrder;
    eventType?: Prisma.SortOrder;
    metadata?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    institution?: Prisma.InstitutionOrderByWithRelationInput;
    request?: Prisma.ServiceRequestOrderByWithRelationInput;
    actor?: Prisma.UserOrderByWithRelationInput;
};
export type AuditEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.AuditEventWhereInput | Prisma.AuditEventWhereInput[];
    OR?: Prisma.AuditEventWhereInput[];
    NOT?: Prisma.AuditEventWhereInput | Prisma.AuditEventWhereInput[];
    institutionId?: Prisma.StringFilter<"AuditEvent"> | string;
    requestId?: Prisma.StringFilter<"AuditEvent"> | string;
    actorId?: Prisma.StringNullableFilter<"AuditEvent"> | string | null;
    eventType?: Prisma.EnumAuditEventTypeFilter<"AuditEvent"> | $Enums.AuditEventType;
    metadata?: Prisma.JsonNullableFilter<"AuditEvent">;
    createdAt?: Prisma.DateTimeFilter<"AuditEvent"> | Date | string;
    institution?: Prisma.XOR<Prisma.InstitutionScalarRelationFilter, Prisma.InstitutionWhereInput>;
    request?: Prisma.XOR<Prisma.ServiceRequestScalarRelationFilter, Prisma.ServiceRequestWhereInput>;
    actor?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
}, "id">;
export type AuditEventOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    institutionId?: Prisma.SortOrder;
    requestId?: Prisma.SortOrder;
    actorId?: Prisma.SortOrderInput | Prisma.SortOrder;
    eventType?: Prisma.SortOrder;
    metadata?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.AuditEventCountOrderByAggregateInput;
    _max?: Prisma.AuditEventMaxOrderByAggregateInput;
    _min?: Prisma.AuditEventMinOrderByAggregateInput;
};
export type AuditEventScalarWhereWithAggregatesInput = {
    AND?: Prisma.AuditEventScalarWhereWithAggregatesInput | Prisma.AuditEventScalarWhereWithAggregatesInput[];
    OR?: Prisma.AuditEventScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AuditEventScalarWhereWithAggregatesInput | Prisma.AuditEventScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"AuditEvent"> | string;
    institutionId?: Prisma.StringWithAggregatesFilter<"AuditEvent"> | string;
    requestId?: Prisma.StringWithAggregatesFilter<"AuditEvent"> | string;
    actorId?: Prisma.StringNullableWithAggregatesFilter<"AuditEvent"> | string | null;
    eventType?: Prisma.EnumAuditEventTypeWithAggregatesFilter<"AuditEvent"> | $Enums.AuditEventType;
    metadata?: Prisma.JsonNullableWithAggregatesFilter<"AuditEvent">;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"AuditEvent"> | Date | string;
};
export type AuditEventCreateInput = {
    id?: string;
    eventType: $Enums.AuditEventType;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    institution: Prisma.InstitutionCreateNestedOneWithoutAuditEventsInput;
    request: Prisma.ServiceRequestCreateNestedOneWithoutAuditEventsInput;
    actor?: Prisma.UserCreateNestedOneWithoutAuditEventsInput;
};
export type AuditEventUncheckedCreateInput = {
    id?: string;
    institutionId: string;
    requestId: string;
    actorId?: string | null;
    eventType: $Enums.AuditEventType;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type AuditEventUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    eventType?: Prisma.EnumAuditEventTypeFieldUpdateOperationsInput | $Enums.AuditEventType;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    institution?: Prisma.InstitutionUpdateOneRequiredWithoutAuditEventsNestedInput;
    request?: Prisma.ServiceRequestUpdateOneRequiredWithoutAuditEventsNestedInput;
    actor?: Prisma.UserUpdateOneWithoutAuditEventsNestedInput;
};
export type AuditEventUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    institutionId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestId?: Prisma.StringFieldUpdateOperationsInput | string;
    actorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    eventType?: Prisma.EnumAuditEventTypeFieldUpdateOperationsInput | $Enums.AuditEventType;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AuditEventCreateManyInput = {
    id?: string;
    institutionId: string;
    requestId: string;
    actorId?: string | null;
    eventType: $Enums.AuditEventType;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type AuditEventUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    eventType?: Prisma.EnumAuditEventTypeFieldUpdateOperationsInput | $Enums.AuditEventType;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AuditEventUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    institutionId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestId?: Prisma.StringFieldUpdateOperationsInput | string;
    actorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    eventType?: Prisma.EnumAuditEventTypeFieldUpdateOperationsInput | $Enums.AuditEventType;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AuditEventListRelationFilter = {
    every?: Prisma.AuditEventWhereInput;
    some?: Prisma.AuditEventWhereInput;
    none?: Prisma.AuditEventWhereInput;
};
export type AuditEventOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type AuditEventCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    institutionId?: Prisma.SortOrder;
    requestId?: Prisma.SortOrder;
    actorId?: Prisma.SortOrder;
    eventType?: Prisma.SortOrder;
    metadata?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AuditEventMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    institutionId?: Prisma.SortOrder;
    requestId?: Prisma.SortOrder;
    actorId?: Prisma.SortOrder;
    eventType?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AuditEventMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    institutionId?: Prisma.SortOrder;
    requestId?: Prisma.SortOrder;
    actorId?: Prisma.SortOrder;
    eventType?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AuditEventCreateNestedManyWithoutInstitutionInput = {
    create?: Prisma.XOR<Prisma.AuditEventCreateWithoutInstitutionInput, Prisma.AuditEventUncheckedCreateWithoutInstitutionInput> | Prisma.AuditEventCreateWithoutInstitutionInput[] | Prisma.AuditEventUncheckedCreateWithoutInstitutionInput[];
    connectOrCreate?: Prisma.AuditEventCreateOrConnectWithoutInstitutionInput | Prisma.AuditEventCreateOrConnectWithoutInstitutionInput[];
    createMany?: Prisma.AuditEventCreateManyInstitutionInputEnvelope;
    connect?: Prisma.AuditEventWhereUniqueInput | Prisma.AuditEventWhereUniqueInput[];
};
export type AuditEventUncheckedCreateNestedManyWithoutInstitutionInput = {
    create?: Prisma.XOR<Prisma.AuditEventCreateWithoutInstitutionInput, Prisma.AuditEventUncheckedCreateWithoutInstitutionInput> | Prisma.AuditEventCreateWithoutInstitutionInput[] | Prisma.AuditEventUncheckedCreateWithoutInstitutionInput[];
    connectOrCreate?: Prisma.AuditEventCreateOrConnectWithoutInstitutionInput | Prisma.AuditEventCreateOrConnectWithoutInstitutionInput[];
    createMany?: Prisma.AuditEventCreateManyInstitutionInputEnvelope;
    connect?: Prisma.AuditEventWhereUniqueInput | Prisma.AuditEventWhereUniqueInput[];
};
export type AuditEventUpdateManyWithoutInstitutionNestedInput = {
    create?: Prisma.XOR<Prisma.AuditEventCreateWithoutInstitutionInput, Prisma.AuditEventUncheckedCreateWithoutInstitutionInput> | Prisma.AuditEventCreateWithoutInstitutionInput[] | Prisma.AuditEventUncheckedCreateWithoutInstitutionInput[];
    connectOrCreate?: Prisma.AuditEventCreateOrConnectWithoutInstitutionInput | Prisma.AuditEventCreateOrConnectWithoutInstitutionInput[];
    upsert?: Prisma.AuditEventUpsertWithWhereUniqueWithoutInstitutionInput | Prisma.AuditEventUpsertWithWhereUniqueWithoutInstitutionInput[];
    createMany?: Prisma.AuditEventCreateManyInstitutionInputEnvelope;
    set?: Prisma.AuditEventWhereUniqueInput | Prisma.AuditEventWhereUniqueInput[];
    disconnect?: Prisma.AuditEventWhereUniqueInput | Prisma.AuditEventWhereUniqueInput[];
    delete?: Prisma.AuditEventWhereUniqueInput | Prisma.AuditEventWhereUniqueInput[];
    connect?: Prisma.AuditEventWhereUniqueInput | Prisma.AuditEventWhereUniqueInput[];
    update?: Prisma.AuditEventUpdateWithWhereUniqueWithoutInstitutionInput | Prisma.AuditEventUpdateWithWhereUniqueWithoutInstitutionInput[];
    updateMany?: Prisma.AuditEventUpdateManyWithWhereWithoutInstitutionInput | Prisma.AuditEventUpdateManyWithWhereWithoutInstitutionInput[];
    deleteMany?: Prisma.AuditEventScalarWhereInput | Prisma.AuditEventScalarWhereInput[];
};
export type AuditEventUncheckedUpdateManyWithoutInstitutionNestedInput = {
    create?: Prisma.XOR<Prisma.AuditEventCreateWithoutInstitutionInput, Prisma.AuditEventUncheckedCreateWithoutInstitutionInput> | Prisma.AuditEventCreateWithoutInstitutionInput[] | Prisma.AuditEventUncheckedCreateWithoutInstitutionInput[];
    connectOrCreate?: Prisma.AuditEventCreateOrConnectWithoutInstitutionInput | Prisma.AuditEventCreateOrConnectWithoutInstitutionInput[];
    upsert?: Prisma.AuditEventUpsertWithWhereUniqueWithoutInstitutionInput | Prisma.AuditEventUpsertWithWhereUniqueWithoutInstitutionInput[];
    createMany?: Prisma.AuditEventCreateManyInstitutionInputEnvelope;
    set?: Prisma.AuditEventWhereUniqueInput | Prisma.AuditEventWhereUniqueInput[];
    disconnect?: Prisma.AuditEventWhereUniqueInput | Prisma.AuditEventWhereUniqueInput[];
    delete?: Prisma.AuditEventWhereUniqueInput | Prisma.AuditEventWhereUniqueInput[];
    connect?: Prisma.AuditEventWhereUniqueInput | Prisma.AuditEventWhereUniqueInput[];
    update?: Prisma.AuditEventUpdateWithWhereUniqueWithoutInstitutionInput | Prisma.AuditEventUpdateWithWhereUniqueWithoutInstitutionInput[];
    updateMany?: Prisma.AuditEventUpdateManyWithWhereWithoutInstitutionInput | Prisma.AuditEventUpdateManyWithWhereWithoutInstitutionInput[];
    deleteMany?: Prisma.AuditEventScalarWhereInput | Prisma.AuditEventScalarWhereInput[];
};
export type AuditEventCreateNestedManyWithoutActorInput = {
    create?: Prisma.XOR<Prisma.AuditEventCreateWithoutActorInput, Prisma.AuditEventUncheckedCreateWithoutActorInput> | Prisma.AuditEventCreateWithoutActorInput[] | Prisma.AuditEventUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.AuditEventCreateOrConnectWithoutActorInput | Prisma.AuditEventCreateOrConnectWithoutActorInput[];
    createMany?: Prisma.AuditEventCreateManyActorInputEnvelope;
    connect?: Prisma.AuditEventWhereUniqueInput | Prisma.AuditEventWhereUniqueInput[];
};
export type AuditEventUncheckedCreateNestedManyWithoutActorInput = {
    create?: Prisma.XOR<Prisma.AuditEventCreateWithoutActorInput, Prisma.AuditEventUncheckedCreateWithoutActorInput> | Prisma.AuditEventCreateWithoutActorInput[] | Prisma.AuditEventUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.AuditEventCreateOrConnectWithoutActorInput | Prisma.AuditEventCreateOrConnectWithoutActorInput[];
    createMany?: Prisma.AuditEventCreateManyActorInputEnvelope;
    connect?: Prisma.AuditEventWhereUniqueInput | Prisma.AuditEventWhereUniqueInput[];
};
export type AuditEventUpdateManyWithoutActorNestedInput = {
    create?: Prisma.XOR<Prisma.AuditEventCreateWithoutActorInput, Prisma.AuditEventUncheckedCreateWithoutActorInput> | Prisma.AuditEventCreateWithoutActorInput[] | Prisma.AuditEventUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.AuditEventCreateOrConnectWithoutActorInput | Prisma.AuditEventCreateOrConnectWithoutActorInput[];
    upsert?: Prisma.AuditEventUpsertWithWhereUniqueWithoutActorInput | Prisma.AuditEventUpsertWithWhereUniqueWithoutActorInput[];
    createMany?: Prisma.AuditEventCreateManyActorInputEnvelope;
    set?: Prisma.AuditEventWhereUniqueInput | Prisma.AuditEventWhereUniqueInput[];
    disconnect?: Prisma.AuditEventWhereUniqueInput | Prisma.AuditEventWhereUniqueInput[];
    delete?: Prisma.AuditEventWhereUniqueInput | Prisma.AuditEventWhereUniqueInput[];
    connect?: Prisma.AuditEventWhereUniqueInput | Prisma.AuditEventWhereUniqueInput[];
    update?: Prisma.AuditEventUpdateWithWhereUniqueWithoutActorInput | Prisma.AuditEventUpdateWithWhereUniqueWithoutActorInput[];
    updateMany?: Prisma.AuditEventUpdateManyWithWhereWithoutActorInput | Prisma.AuditEventUpdateManyWithWhereWithoutActorInput[];
    deleteMany?: Prisma.AuditEventScalarWhereInput | Prisma.AuditEventScalarWhereInput[];
};
export type AuditEventUncheckedUpdateManyWithoutActorNestedInput = {
    create?: Prisma.XOR<Prisma.AuditEventCreateWithoutActorInput, Prisma.AuditEventUncheckedCreateWithoutActorInput> | Prisma.AuditEventCreateWithoutActorInput[] | Prisma.AuditEventUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.AuditEventCreateOrConnectWithoutActorInput | Prisma.AuditEventCreateOrConnectWithoutActorInput[];
    upsert?: Prisma.AuditEventUpsertWithWhereUniqueWithoutActorInput | Prisma.AuditEventUpsertWithWhereUniqueWithoutActorInput[];
    createMany?: Prisma.AuditEventCreateManyActorInputEnvelope;
    set?: Prisma.AuditEventWhereUniqueInput | Prisma.AuditEventWhereUniqueInput[];
    disconnect?: Prisma.AuditEventWhereUniqueInput | Prisma.AuditEventWhereUniqueInput[];
    delete?: Prisma.AuditEventWhereUniqueInput | Prisma.AuditEventWhereUniqueInput[];
    connect?: Prisma.AuditEventWhereUniqueInput | Prisma.AuditEventWhereUniqueInput[];
    update?: Prisma.AuditEventUpdateWithWhereUniqueWithoutActorInput | Prisma.AuditEventUpdateWithWhereUniqueWithoutActorInput[];
    updateMany?: Prisma.AuditEventUpdateManyWithWhereWithoutActorInput | Prisma.AuditEventUpdateManyWithWhereWithoutActorInput[];
    deleteMany?: Prisma.AuditEventScalarWhereInput | Prisma.AuditEventScalarWhereInput[];
};
export type AuditEventCreateNestedManyWithoutRequestInput = {
    create?: Prisma.XOR<Prisma.AuditEventCreateWithoutRequestInput, Prisma.AuditEventUncheckedCreateWithoutRequestInput> | Prisma.AuditEventCreateWithoutRequestInput[] | Prisma.AuditEventUncheckedCreateWithoutRequestInput[];
    connectOrCreate?: Prisma.AuditEventCreateOrConnectWithoutRequestInput | Prisma.AuditEventCreateOrConnectWithoutRequestInput[];
    createMany?: Prisma.AuditEventCreateManyRequestInputEnvelope;
    connect?: Prisma.AuditEventWhereUniqueInput | Prisma.AuditEventWhereUniqueInput[];
};
export type AuditEventUncheckedCreateNestedManyWithoutRequestInput = {
    create?: Prisma.XOR<Prisma.AuditEventCreateWithoutRequestInput, Prisma.AuditEventUncheckedCreateWithoutRequestInput> | Prisma.AuditEventCreateWithoutRequestInput[] | Prisma.AuditEventUncheckedCreateWithoutRequestInput[];
    connectOrCreate?: Prisma.AuditEventCreateOrConnectWithoutRequestInput | Prisma.AuditEventCreateOrConnectWithoutRequestInput[];
    createMany?: Prisma.AuditEventCreateManyRequestInputEnvelope;
    connect?: Prisma.AuditEventWhereUniqueInput | Prisma.AuditEventWhereUniqueInput[];
};
export type AuditEventUpdateManyWithoutRequestNestedInput = {
    create?: Prisma.XOR<Prisma.AuditEventCreateWithoutRequestInput, Prisma.AuditEventUncheckedCreateWithoutRequestInput> | Prisma.AuditEventCreateWithoutRequestInput[] | Prisma.AuditEventUncheckedCreateWithoutRequestInput[];
    connectOrCreate?: Prisma.AuditEventCreateOrConnectWithoutRequestInput | Prisma.AuditEventCreateOrConnectWithoutRequestInput[];
    upsert?: Prisma.AuditEventUpsertWithWhereUniqueWithoutRequestInput | Prisma.AuditEventUpsertWithWhereUniqueWithoutRequestInput[];
    createMany?: Prisma.AuditEventCreateManyRequestInputEnvelope;
    set?: Prisma.AuditEventWhereUniqueInput | Prisma.AuditEventWhereUniqueInput[];
    disconnect?: Prisma.AuditEventWhereUniqueInput | Prisma.AuditEventWhereUniqueInput[];
    delete?: Prisma.AuditEventWhereUniqueInput | Prisma.AuditEventWhereUniqueInput[];
    connect?: Prisma.AuditEventWhereUniqueInput | Prisma.AuditEventWhereUniqueInput[];
    update?: Prisma.AuditEventUpdateWithWhereUniqueWithoutRequestInput | Prisma.AuditEventUpdateWithWhereUniqueWithoutRequestInput[];
    updateMany?: Prisma.AuditEventUpdateManyWithWhereWithoutRequestInput | Prisma.AuditEventUpdateManyWithWhereWithoutRequestInput[];
    deleteMany?: Prisma.AuditEventScalarWhereInput | Prisma.AuditEventScalarWhereInput[];
};
export type AuditEventUncheckedUpdateManyWithoutRequestNestedInput = {
    create?: Prisma.XOR<Prisma.AuditEventCreateWithoutRequestInput, Prisma.AuditEventUncheckedCreateWithoutRequestInput> | Prisma.AuditEventCreateWithoutRequestInput[] | Prisma.AuditEventUncheckedCreateWithoutRequestInput[];
    connectOrCreate?: Prisma.AuditEventCreateOrConnectWithoutRequestInput | Prisma.AuditEventCreateOrConnectWithoutRequestInput[];
    upsert?: Prisma.AuditEventUpsertWithWhereUniqueWithoutRequestInput | Prisma.AuditEventUpsertWithWhereUniqueWithoutRequestInput[];
    createMany?: Prisma.AuditEventCreateManyRequestInputEnvelope;
    set?: Prisma.AuditEventWhereUniqueInput | Prisma.AuditEventWhereUniqueInput[];
    disconnect?: Prisma.AuditEventWhereUniqueInput | Prisma.AuditEventWhereUniqueInput[];
    delete?: Prisma.AuditEventWhereUniqueInput | Prisma.AuditEventWhereUniqueInput[];
    connect?: Prisma.AuditEventWhereUniqueInput | Prisma.AuditEventWhereUniqueInput[];
    update?: Prisma.AuditEventUpdateWithWhereUniqueWithoutRequestInput | Prisma.AuditEventUpdateWithWhereUniqueWithoutRequestInput[];
    updateMany?: Prisma.AuditEventUpdateManyWithWhereWithoutRequestInput | Prisma.AuditEventUpdateManyWithWhereWithoutRequestInput[];
    deleteMany?: Prisma.AuditEventScalarWhereInput | Prisma.AuditEventScalarWhereInput[];
};
export type EnumAuditEventTypeFieldUpdateOperationsInput = {
    set?: $Enums.AuditEventType;
};
export type AuditEventCreateWithoutInstitutionInput = {
    id?: string;
    eventType: $Enums.AuditEventType;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    request: Prisma.ServiceRequestCreateNestedOneWithoutAuditEventsInput;
    actor?: Prisma.UserCreateNestedOneWithoutAuditEventsInput;
};
export type AuditEventUncheckedCreateWithoutInstitutionInput = {
    id?: string;
    requestId: string;
    actorId?: string | null;
    eventType: $Enums.AuditEventType;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type AuditEventCreateOrConnectWithoutInstitutionInput = {
    where: Prisma.AuditEventWhereUniqueInput;
    create: Prisma.XOR<Prisma.AuditEventCreateWithoutInstitutionInput, Prisma.AuditEventUncheckedCreateWithoutInstitutionInput>;
};
export type AuditEventCreateManyInstitutionInputEnvelope = {
    data: Prisma.AuditEventCreateManyInstitutionInput | Prisma.AuditEventCreateManyInstitutionInput[];
    skipDuplicates?: boolean;
};
export type AuditEventUpsertWithWhereUniqueWithoutInstitutionInput = {
    where: Prisma.AuditEventWhereUniqueInput;
    update: Prisma.XOR<Prisma.AuditEventUpdateWithoutInstitutionInput, Prisma.AuditEventUncheckedUpdateWithoutInstitutionInput>;
    create: Prisma.XOR<Prisma.AuditEventCreateWithoutInstitutionInput, Prisma.AuditEventUncheckedCreateWithoutInstitutionInput>;
};
export type AuditEventUpdateWithWhereUniqueWithoutInstitutionInput = {
    where: Prisma.AuditEventWhereUniqueInput;
    data: Prisma.XOR<Prisma.AuditEventUpdateWithoutInstitutionInput, Prisma.AuditEventUncheckedUpdateWithoutInstitutionInput>;
};
export type AuditEventUpdateManyWithWhereWithoutInstitutionInput = {
    where: Prisma.AuditEventScalarWhereInput;
    data: Prisma.XOR<Prisma.AuditEventUpdateManyMutationInput, Prisma.AuditEventUncheckedUpdateManyWithoutInstitutionInput>;
};
export type AuditEventScalarWhereInput = {
    AND?: Prisma.AuditEventScalarWhereInput | Prisma.AuditEventScalarWhereInput[];
    OR?: Prisma.AuditEventScalarWhereInput[];
    NOT?: Prisma.AuditEventScalarWhereInput | Prisma.AuditEventScalarWhereInput[];
    id?: Prisma.StringFilter<"AuditEvent"> | string;
    institutionId?: Prisma.StringFilter<"AuditEvent"> | string;
    requestId?: Prisma.StringFilter<"AuditEvent"> | string;
    actorId?: Prisma.StringNullableFilter<"AuditEvent"> | string | null;
    eventType?: Prisma.EnumAuditEventTypeFilter<"AuditEvent"> | $Enums.AuditEventType;
    metadata?: Prisma.JsonNullableFilter<"AuditEvent">;
    createdAt?: Prisma.DateTimeFilter<"AuditEvent"> | Date | string;
};
export type AuditEventCreateWithoutActorInput = {
    id?: string;
    eventType: $Enums.AuditEventType;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    institution: Prisma.InstitutionCreateNestedOneWithoutAuditEventsInput;
    request: Prisma.ServiceRequestCreateNestedOneWithoutAuditEventsInput;
};
export type AuditEventUncheckedCreateWithoutActorInput = {
    id?: string;
    institutionId: string;
    requestId: string;
    eventType: $Enums.AuditEventType;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type AuditEventCreateOrConnectWithoutActorInput = {
    where: Prisma.AuditEventWhereUniqueInput;
    create: Prisma.XOR<Prisma.AuditEventCreateWithoutActorInput, Prisma.AuditEventUncheckedCreateWithoutActorInput>;
};
export type AuditEventCreateManyActorInputEnvelope = {
    data: Prisma.AuditEventCreateManyActorInput | Prisma.AuditEventCreateManyActorInput[];
    skipDuplicates?: boolean;
};
export type AuditEventUpsertWithWhereUniqueWithoutActorInput = {
    where: Prisma.AuditEventWhereUniqueInput;
    update: Prisma.XOR<Prisma.AuditEventUpdateWithoutActorInput, Prisma.AuditEventUncheckedUpdateWithoutActorInput>;
    create: Prisma.XOR<Prisma.AuditEventCreateWithoutActorInput, Prisma.AuditEventUncheckedCreateWithoutActorInput>;
};
export type AuditEventUpdateWithWhereUniqueWithoutActorInput = {
    where: Prisma.AuditEventWhereUniqueInput;
    data: Prisma.XOR<Prisma.AuditEventUpdateWithoutActorInput, Prisma.AuditEventUncheckedUpdateWithoutActorInput>;
};
export type AuditEventUpdateManyWithWhereWithoutActorInput = {
    where: Prisma.AuditEventScalarWhereInput;
    data: Prisma.XOR<Prisma.AuditEventUpdateManyMutationInput, Prisma.AuditEventUncheckedUpdateManyWithoutActorInput>;
};
export type AuditEventCreateWithoutRequestInput = {
    id?: string;
    eventType: $Enums.AuditEventType;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    institution: Prisma.InstitutionCreateNestedOneWithoutAuditEventsInput;
    actor?: Prisma.UserCreateNestedOneWithoutAuditEventsInput;
};
export type AuditEventUncheckedCreateWithoutRequestInput = {
    id?: string;
    institutionId: string;
    actorId?: string | null;
    eventType: $Enums.AuditEventType;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type AuditEventCreateOrConnectWithoutRequestInput = {
    where: Prisma.AuditEventWhereUniqueInput;
    create: Prisma.XOR<Prisma.AuditEventCreateWithoutRequestInput, Prisma.AuditEventUncheckedCreateWithoutRequestInput>;
};
export type AuditEventCreateManyRequestInputEnvelope = {
    data: Prisma.AuditEventCreateManyRequestInput | Prisma.AuditEventCreateManyRequestInput[];
    skipDuplicates?: boolean;
};
export type AuditEventUpsertWithWhereUniqueWithoutRequestInput = {
    where: Prisma.AuditEventWhereUniqueInput;
    update: Prisma.XOR<Prisma.AuditEventUpdateWithoutRequestInput, Prisma.AuditEventUncheckedUpdateWithoutRequestInput>;
    create: Prisma.XOR<Prisma.AuditEventCreateWithoutRequestInput, Prisma.AuditEventUncheckedCreateWithoutRequestInput>;
};
export type AuditEventUpdateWithWhereUniqueWithoutRequestInput = {
    where: Prisma.AuditEventWhereUniqueInput;
    data: Prisma.XOR<Prisma.AuditEventUpdateWithoutRequestInput, Prisma.AuditEventUncheckedUpdateWithoutRequestInput>;
};
export type AuditEventUpdateManyWithWhereWithoutRequestInput = {
    where: Prisma.AuditEventScalarWhereInput;
    data: Prisma.XOR<Prisma.AuditEventUpdateManyMutationInput, Prisma.AuditEventUncheckedUpdateManyWithoutRequestInput>;
};
export type AuditEventCreateManyInstitutionInput = {
    id?: string;
    requestId: string;
    actorId?: string | null;
    eventType: $Enums.AuditEventType;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type AuditEventUpdateWithoutInstitutionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    eventType?: Prisma.EnumAuditEventTypeFieldUpdateOperationsInput | $Enums.AuditEventType;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    request?: Prisma.ServiceRequestUpdateOneRequiredWithoutAuditEventsNestedInput;
    actor?: Prisma.UserUpdateOneWithoutAuditEventsNestedInput;
};
export type AuditEventUncheckedUpdateWithoutInstitutionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestId?: Prisma.StringFieldUpdateOperationsInput | string;
    actorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    eventType?: Prisma.EnumAuditEventTypeFieldUpdateOperationsInput | $Enums.AuditEventType;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AuditEventUncheckedUpdateManyWithoutInstitutionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestId?: Prisma.StringFieldUpdateOperationsInput | string;
    actorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    eventType?: Prisma.EnumAuditEventTypeFieldUpdateOperationsInput | $Enums.AuditEventType;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AuditEventCreateManyActorInput = {
    id?: string;
    institutionId: string;
    requestId: string;
    eventType: $Enums.AuditEventType;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type AuditEventUpdateWithoutActorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    eventType?: Prisma.EnumAuditEventTypeFieldUpdateOperationsInput | $Enums.AuditEventType;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    institution?: Prisma.InstitutionUpdateOneRequiredWithoutAuditEventsNestedInput;
    request?: Prisma.ServiceRequestUpdateOneRequiredWithoutAuditEventsNestedInput;
};
export type AuditEventUncheckedUpdateWithoutActorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    institutionId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestId?: Prisma.StringFieldUpdateOperationsInput | string;
    eventType?: Prisma.EnumAuditEventTypeFieldUpdateOperationsInput | $Enums.AuditEventType;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AuditEventUncheckedUpdateManyWithoutActorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    institutionId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestId?: Prisma.StringFieldUpdateOperationsInput | string;
    eventType?: Prisma.EnumAuditEventTypeFieldUpdateOperationsInput | $Enums.AuditEventType;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AuditEventCreateManyRequestInput = {
    id?: string;
    institutionId: string;
    actorId?: string | null;
    eventType: $Enums.AuditEventType;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type AuditEventUpdateWithoutRequestInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    eventType?: Prisma.EnumAuditEventTypeFieldUpdateOperationsInput | $Enums.AuditEventType;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    institution?: Prisma.InstitutionUpdateOneRequiredWithoutAuditEventsNestedInput;
    actor?: Prisma.UserUpdateOneWithoutAuditEventsNestedInput;
};
export type AuditEventUncheckedUpdateWithoutRequestInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    institutionId?: Prisma.StringFieldUpdateOperationsInput | string;
    actorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    eventType?: Prisma.EnumAuditEventTypeFieldUpdateOperationsInput | $Enums.AuditEventType;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AuditEventUncheckedUpdateManyWithoutRequestInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    institutionId?: Prisma.StringFieldUpdateOperationsInput | string;
    actorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    eventType?: Prisma.EnumAuditEventTypeFieldUpdateOperationsInput | $Enums.AuditEventType;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AuditEventSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    institutionId?: boolean;
    requestId?: boolean;
    actorId?: boolean;
    eventType?: boolean;
    metadata?: boolean;
    createdAt?: boolean;
    institution?: boolean | Prisma.InstitutionDefaultArgs<ExtArgs>;
    request?: boolean | Prisma.ServiceRequestDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.AuditEvent$actorArgs<ExtArgs>;
}, ExtArgs["result"]["auditEvent"]>;
export type AuditEventSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    institutionId?: boolean;
    requestId?: boolean;
    actorId?: boolean;
    eventType?: boolean;
    metadata?: boolean;
    createdAt?: boolean;
    institution?: boolean | Prisma.InstitutionDefaultArgs<ExtArgs>;
    request?: boolean | Prisma.ServiceRequestDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.AuditEvent$actorArgs<ExtArgs>;
}, ExtArgs["result"]["auditEvent"]>;
export type AuditEventSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    institutionId?: boolean;
    requestId?: boolean;
    actorId?: boolean;
    eventType?: boolean;
    metadata?: boolean;
    createdAt?: boolean;
    institution?: boolean | Prisma.InstitutionDefaultArgs<ExtArgs>;
    request?: boolean | Prisma.ServiceRequestDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.AuditEvent$actorArgs<ExtArgs>;
}, ExtArgs["result"]["auditEvent"]>;
export type AuditEventSelectScalar = {
    id?: boolean;
    institutionId?: boolean;
    requestId?: boolean;
    actorId?: boolean;
    eventType?: boolean;
    metadata?: boolean;
    createdAt?: boolean;
};
export type AuditEventOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "institutionId" | "requestId" | "actorId" | "eventType" | "metadata" | "createdAt", ExtArgs["result"]["auditEvent"]>;
export type AuditEventInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    institution?: boolean | Prisma.InstitutionDefaultArgs<ExtArgs>;
    request?: boolean | Prisma.ServiceRequestDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.AuditEvent$actorArgs<ExtArgs>;
};
export type AuditEventIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    institution?: boolean | Prisma.InstitutionDefaultArgs<ExtArgs>;
    request?: boolean | Prisma.ServiceRequestDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.AuditEvent$actorArgs<ExtArgs>;
};
export type AuditEventIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    institution?: boolean | Prisma.InstitutionDefaultArgs<ExtArgs>;
    request?: boolean | Prisma.ServiceRequestDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.AuditEvent$actorArgs<ExtArgs>;
};
export type $AuditEventPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "AuditEvent";
    objects: {
        institution: Prisma.$InstitutionPayload<ExtArgs>;
        request: Prisma.$ServiceRequestPayload<ExtArgs>;
        actor: Prisma.$UserPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        institutionId: string;
        requestId: string;
        actorId: string | null;
        eventType: $Enums.AuditEventType;
        metadata: runtime.JsonValue | null;
        createdAt: Date;
    }, ExtArgs["result"]["auditEvent"]>;
    composites: {};
};
export type AuditEventGetPayload<S extends boolean | null | undefined | AuditEventDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AuditEventPayload, S>;
export type AuditEventCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AuditEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AuditEventCountAggregateInputType | true;
};
export interface AuditEventDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['AuditEvent'];
        meta: {
            name: 'AuditEvent';
        };
    };
    findUnique<T extends AuditEventFindUniqueArgs>(args: Prisma.SelectSubset<T, AuditEventFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AuditEventClient<runtime.Types.Result.GetResult<Prisma.$AuditEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends AuditEventFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AuditEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AuditEventClient<runtime.Types.Result.GetResult<Prisma.$AuditEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends AuditEventFindFirstArgs>(args?: Prisma.SelectSubset<T, AuditEventFindFirstArgs<ExtArgs>>): Prisma.Prisma__AuditEventClient<runtime.Types.Result.GetResult<Prisma.$AuditEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends AuditEventFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AuditEventFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AuditEventClient<runtime.Types.Result.GetResult<Prisma.$AuditEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends AuditEventFindManyArgs>(args?: Prisma.SelectSubset<T, AuditEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AuditEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends AuditEventCreateArgs>(args: Prisma.SelectSubset<T, AuditEventCreateArgs<ExtArgs>>): Prisma.Prisma__AuditEventClient<runtime.Types.Result.GetResult<Prisma.$AuditEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends AuditEventCreateManyArgs>(args?: Prisma.SelectSubset<T, AuditEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends AuditEventCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AuditEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AuditEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends AuditEventDeleteArgs>(args: Prisma.SelectSubset<T, AuditEventDeleteArgs<ExtArgs>>): Prisma.Prisma__AuditEventClient<runtime.Types.Result.GetResult<Prisma.$AuditEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends AuditEventUpdateArgs>(args: Prisma.SelectSubset<T, AuditEventUpdateArgs<ExtArgs>>): Prisma.Prisma__AuditEventClient<runtime.Types.Result.GetResult<Prisma.$AuditEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends AuditEventDeleteManyArgs>(args?: Prisma.SelectSubset<T, AuditEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends AuditEventUpdateManyArgs>(args: Prisma.SelectSubset<T, AuditEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends AuditEventUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AuditEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AuditEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends AuditEventUpsertArgs>(args: Prisma.SelectSubset<T, AuditEventUpsertArgs<ExtArgs>>): Prisma.Prisma__AuditEventClient<runtime.Types.Result.GetResult<Prisma.$AuditEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends AuditEventCountArgs>(args?: Prisma.Subset<T, AuditEventCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AuditEventCountAggregateOutputType> : number>;
    aggregate<T extends AuditEventAggregateArgs>(args: Prisma.Subset<T, AuditEventAggregateArgs>): Prisma.PrismaPromise<GetAuditEventAggregateType<T>>;
    groupBy<T extends AuditEventGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AuditEventGroupByArgs['orderBy'];
    } : {
        orderBy?: AuditEventGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AuditEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: AuditEventFieldRefs;
}
export interface Prisma__AuditEventClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    institution<T extends Prisma.InstitutionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.InstitutionDefaultArgs<ExtArgs>>): Prisma.Prisma__InstitutionClient<runtime.Types.Result.GetResult<Prisma.$InstitutionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    request<T extends Prisma.ServiceRequestDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ServiceRequestDefaultArgs<ExtArgs>>): Prisma.Prisma__ServiceRequestClient<runtime.Types.Result.GetResult<Prisma.$ServiceRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    actor<T extends Prisma.AuditEvent$actorArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AuditEvent$actorArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface AuditEventFieldRefs {
    readonly id: Prisma.FieldRef<"AuditEvent", 'String'>;
    readonly institutionId: Prisma.FieldRef<"AuditEvent", 'String'>;
    readonly requestId: Prisma.FieldRef<"AuditEvent", 'String'>;
    readonly actorId: Prisma.FieldRef<"AuditEvent", 'String'>;
    readonly eventType: Prisma.FieldRef<"AuditEvent", 'AuditEventType'>;
    readonly metadata: Prisma.FieldRef<"AuditEvent", 'Json'>;
    readonly createdAt: Prisma.FieldRef<"AuditEvent", 'DateTime'>;
}
export type AuditEventFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditEventSelect<ExtArgs> | null;
    omit?: Prisma.AuditEventOmit<ExtArgs> | null;
    include?: Prisma.AuditEventInclude<ExtArgs> | null;
    where: Prisma.AuditEventWhereUniqueInput;
};
export type AuditEventFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditEventSelect<ExtArgs> | null;
    omit?: Prisma.AuditEventOmit<ExtArgs> | null;
    include?: Prisma.AuditEventInclude<ExtArgs> | null;
    where: Prisma.AuditEventWhereUniqueInput;
};
export type AuditEventFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type AuditEventFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type AuditEventFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type AuditEventCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditEventSelect<ExtArgs> | null;
    omit?: Prisma.AuditEventOmit<ExtArgs> | null;
    include?: Prisma.AuditEventInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AuditEventCreateInput, Prisma.AuditEventUncheckedCreateInput>;
};
export type AuditEventCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.AuditEventCreateManyInput | Prisma.AuditEventCreateManyInput[];
    skipDuplicates?: boolean;
};
export type AuditEventCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditEventSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AuditEventOmit<ExtArgs> | null;
    data: Prisma.AuditEventCreateManyInput | Prisma.AuditEventCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.AuditEventIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type AuditEventUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditEventSelect<ExtArgs> | null;
    omit?: Prisma.AuditEventOmit<ExtArgs> | null;
    include?: Prisma.AuditEventInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AuditEventUpdateInput, Prisma.AuditEventUncheckedUpdateInput>;
    where: Prisma.AuditEventWhereUniqueInput;
};
export type AuditEventUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.AuditEventUpdateManyMutationInput, Prisma.AuditEventUncheckedUpdateManyInput>;
    where?: Prisma.AuditEventWhereInput;
    limit?: number;
};
export type AuditEventUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditEventSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AuditEventOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AuditEventUpdateManyMutationInput, Prisma.AuditEventUncheckedUpdateManyInput>;
    where?: Prisma.AuditEventWhereInput;
    limit?: number;
    include?: Prisma.AuditEventIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type AuditEventUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditEventSelect<ExtArgs> | null;
    omit?: Prisma.AuditEventOmit<ExtArgs> | null;
    include?: Prisma.AuditEventInclude<ExtArgs> | null;
    where: Prisma.AuditEventWhereUniqueInput;
    create: Prisma.XOR<Prisma.AuditEventCreateInput, Prisma.AuditEventUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.AuditEventUpdateInput, Prisma.AuditEventUncheckedUpdateInput>;
};
export type AuditEventDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditEventSelect<ExtArgs> | null;
    omit?: Prisma.AuditEventOmit<ExtArgs> | null;
    include?: Prisma.AuditEventInclude<ExtArgs> | null;
    where: Prisma.AuditEventWhereUniqueInput;
};
export type AuditEventDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AuditEventWhereInput;
    limit?: number;
};
export type AuditEvent$actorArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
export type AuditEventDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditEventSelect<ExtArgs> | null;
    omit?: Prisma.AuditEventOmit<ExtArgs> | null;
    include?: Prisma.AuditEventInclude<ExtArgs> | null;
};
export {};
