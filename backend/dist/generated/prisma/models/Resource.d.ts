import type * as runtime from "@prisma/client/runtime/library";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ResourceModel = runtime.Types.Result.DefaultSelection<Prisma.$ResourcePayload>;
export type AggregateResource = {
    _count: ResourceCountAggregateOutputType | null;
    _avg: ResourceAvgAggregateOutputType | null;
    _sum: ResourceSumAggregateOutputType | null;
    _min: ResourceMinAggregateOutputType | null;
    _max: ResourceMaxAggregateOutputType | null;
};
export type ResourceAvgAggregateOutputType = {
    capacity: number | null;
};
export type ResourceSumAggregateOutputType = {
    capacity: number | null;
};
export type ResourceMinAggregateOutputType = {
    id: string | null;
    institutionId: string | null;
    name: string | null;
    type: $Enums.ResourceType | null;
    location: string | null;
    capacity: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ResourceMaxAggregateOutputType = {
    id: string | null;
    institutionId: string | null;
    name: string | null;
    type: $Enums.ResourceType | null;
    location: string | null;
    capacity: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ResourceCountAggregateOutputType = {
    id: number;
    institutionId: number;
    name: number;
    type: number;
    location: number;
    capacity: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ResourceAvgAggregateInputType = {
    capacity?: true;
};
export type ResourceSumAggregateInputType = {
    capacity?: true;
};
export type ResourceMinAggregateInputType = {
    id?: true;
    institutionId?: true;
    name?: true;
    type?: true;
    location?: true;
    capacity?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ResourceMaxAggregateInputType = {
    id?: true;
    institutionId?: true;
    name?: true;
    type?: true;
    location?: true;
    capacity?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ResourceCountAggregateInputType = {
    id?: true;
    institutionId?: true;
    name?: true;
    type?: true;
    location?: true;
    capacity?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ResourceAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ResourceWhereInput;
    orderBy?: Prisma.ResourceOrderByWithRelationInput | Prisma.ResourceOrderByWithRelationInput[];
    cursor?: Prisma.ResourceWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ResourceCountAggregateInputType;
    _avg?: ResourceAvgAggregateInputType;
    _sum?: ResourceSumAggregateInputType;
    _min?: ResourceMinAggregateInputType;
    _max?: ResourceMaxAggregateInputType;
};
export type GetResourceAggregateType<T extends ResourceAggregateArgs> = {
    [P in keyof T & keyof AggregateResource]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateResource[P]> : Prisma.GetScalarType<T[P], AggregateResource[P]>;
};
export type ResourceGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ResourceWhereInput;
    orderBy?: Prisma.ResourceOrderByWithAggregationInput | Prisma.ResourceOrderByWithAggregationInput[];
    by: Prisma.ResourceScalarFieldEnum[] | Prisma.ResourceScalarFieldEnum;
    having?: Prisma.ResourceScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ResourceCountAggregateInputType | true;
    _avg?: ResourceAvgAggregateInputType;
    _sum?: ResourceSumAggregateInputType;
    _min?: ResourceMinAggregateInputType;
    _max?: ResourceMaxAggregateInputType;
};
export type ResourceGroupByOutputType = {
    id: string;
    institutionId: string;
    name: string;
    type: $Enums.ResourceType;
    location: string | null;
    capacity: number | null;
    createdAt: Date;
    updatedAt: Date;
    _count: ResourceCountAggregateOutputType | null;
    _avg: ResourceAvgAggregateOutputType | null;
    _sum: ResourceSumAggregateOutputType | null;
    _min: ResourceMinAggregateOutputType | null;
    _max: ResourceMaxAggregateOutputType | null;
};
type GetResourceGroupByPayload<T extends ResourceGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ResourceGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ResourceGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ResourceGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ResourceGroupByOutputType[P]>;
}>>;
export type ResourceWhereInput = {
    AND?: Prisma.ResourceWhereInput | Prisma.ResourceWhereInput[];
    OR?: Prisma.ResourceWhereInput[];
    NOT?: Prisma.ResourceWhereInput | Prisma.ResourceWhereInput[];
    id?: Prisma.StringFilter<"Resource"> | string;
    institutionId?: Prisma.StringFilter<"Resource"> | string;
    name?: Prisma.StringFilter<"Resource"> | string;
    type?: Prisma.EnumResourceTypeFilter<"Resource"> | $Enums.ResourceType;
    location?: Prisma.StringNullableFilter<"Resource"> | string | null;
    capacity?: Prisma.IntNullableFilter<"Resource"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"Resource"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Resource"> | Date | string;
    institution?: Prisma.XOR<Prisma.InstitutionScalarRelationFilter, Prisma.InstitutionWhereInput>;
    bookings?: Prisma.BookingListRelationFilter;
};
export type ResourceOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    institutionId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    location?: Prisma.SortOrderInput | Prisma.SortOrder;
    capacity?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    institution?: Prisma.InstitutionOrderByWithRelationInput;
    bookings?: Prisma.BookingOrderByRelationAggregateInput;
};
export type ResourceWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    institutionId_name?: Prisma.ResourceInstitutionIdNameCompoundUniqueInput;
    AND?: Prisma.ResourceWhereInput | Prisma.ResourceWhereInput[];
    OR?: Prisma.ResourceWhereInput[];
    NOT?: Prisma.ResourceWhereInput | Prisma.ResourceWhereInput[];
    institutionId?: Prisma.StringFilter<"Resource"> | string;
    name?: Prisma.StringFilter<"Resource"> | string;
    type?: Prisma.EnumResourceTypeFilter<"Resource"> | $Enums.ResourceType;
    location?: Prisma.StringNullableFilter<"Resource"> | string | null;
    capacity?: Prisma.IntNullableFilter<"Resource"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"Resource"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Resource"> | Date | string;
    institution?: Prisma.XOR<Prisma.InstitutionScalarRelationFilter, Prisma.InstitutionWhereInput>;
    bookings?: Prisma.BookingListRelationFilter;
}, "id" | "institutionId_name">;
export type ResourceOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    institutionId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    location?: Prisma.SortOrderInput | Prisma.SortOrder;
    capacity?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ResourceCountOrderByAggregateInput;
    _avg?: Prisma.ResourceAvgOrderByAggregateInput;
    _max?: Prisma.ResourceMaxOrderByAggregateInput;
    _min?: Prisma.ResourceMinOrderByAggregateInput;
    _sum?: Prisma.ResourceSumOrderByAggregateInput;
};
export type ResourceScalarWhereWithAggregatesInput = {
    AND?: Prisma.ResourceScalarWhereWithAggregatesInput | Prisma.ResourceScalarWhereWithAggregatesInput[];
    OR?: Prisma.ResourceScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ResourceScalarWhereWithAggregatesInput | Prisma.ResourceScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Resource"> | string;
    institutionId?: Prisma.StringWithAggregatesFilter<"Resource"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Resource"> | string;
    type?: Prisma.EnumResourceTypeWithAggregatesFilter<"Resource"> | $Enums.ResourceType;
    location?: Prisma.StringNullableWithAggregatesFilter<"Resource"> | string | null;
    capacity?: Prisma.IntNullableWithAggregatesFilter<"Resource"> | number | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Resource"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Resource"> | Date | string;
};
export type ResourceCreateInput = {
    id?: string;
    name: string;
    type: $Enums.ResourceType;
    location?: string | null;
    capacity?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    institution: Prisma.InstitutionCreateNestedOneWithoutResourcesInput;
    bookings?: Prisma.BookingCreateNestedManyWithoutResourceInput;
};
export type ResourceUncheckedCreateInput = {
    id?: string;
    institutionId: string;
    name: string;
    type: $Enums.ResourceType;
    location?: string | null;
    capacity?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    bookings?: Prisma.BookingUncheckedCreateNestedManyWithoutResourceInput;
};
export type ResourceUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumResourceTypeFieldUpdateOperationsInput | $Enums.ResourceType;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    capacity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    institution?: Prisma.InstitutionUpdateOneRequiredWithoutResourcesNestedInput;
    bookings?: Prisma.BookingUpdateManyWithoutResourceNestedInput;
};
export type ResourceUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    institutionId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumResourceTypeFieldUpdateOperationsInput | $Enums.ResourceType;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    capacity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    bookings?: Prisma.BookingUncheckedUpdateManyWithoutResourceNestedInput;
};
export type ResourceCreateManyInput = {
    id?: string;
    institutionId: string;
    name: string;
    type: $Enums.ResourceType;
    location?: string | null;
    capacity?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ResourceUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumResourceTypeFieldUpdateOperationsInput | $Enums.ResourceType;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    capacity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ResourceUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    institutionId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumResourceTypeFieldUpdateOperationsInput | $Enums.ResourceType;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    capacity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ResourceListRelationFilter = {
    every?: Prisma.ResourceWhereInput;
    some?: Prisma.ResourceWhereInput;
    none?: Prisma.ResourceWhereInput;
};
export type ResourceOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ResourceInstitutionIdNameCompoundUniqueInput = {
    institutionId: string;
    name: string;
};
export type ResourceCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    institutionId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    location?: Prisma.SortOrder;
    capacity?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ResourceAvgOrderByAggregateInput = {
    capacity?: Prisma.SortOrder;
};
export type ResourceMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    institutionId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    location?: Prisma.SortOrder;
    capacity?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ResourceMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    institutionId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    location?: Prisma.SortOrder;
    capacity?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ResourceSumOrderByAggregateInput = {
    capacity?: Prisma.SortOrder;
};
export type ResourceScalarRelationFilter = {
    is?: Prisma.ResourceWhereInput;
    isNot?: Prisma.ResourceWhereInput;
};
export type ResourceCreateNestedManyWithoutInstitutionInput = {
    create?: Prisma.XOR<Prisma.ResourceCreateWithoutInstitutionInput, Prisma.ResourceUncheckedCreateWithoutInstitutionInput> | Prisma.ResourceCreateWithoutInstitutionInput[] | Prisma.ResourceUncheckedCreateWithoutInstitutionInput[];
    connectOrCreate?: Prisma.ResourceCreateOrConnectWithoutInstitutionInput | Prisma.ResourceCreateOrConnectWithoutInstitutionInput[];
    createMany?: Prisma.ResourceCreateManyInstitutionInputEnvelope;
    connect?: Prisma.ResourceWhereUniqueInput | Prisma.ResourceWhereUniqueInput[];
};
export type ResourceUncheckedCreateNestedManyWithoutInstitutionInput = {
    create?: Prisma.XOR<Prisma.ResourceCreateWithoutInstitutionInput, Prisma.ResourceUncheckedCreateWithoutInstitutionInput> | Prisma.ResourceCreateWithoutInstitutionInput[] | Prisma.ResourceUncheckedCreateWithoutInstitutionInput[];
    connectOrCreate?: Prisma.ResourceCreateOrConnectWithoutInstitutionInput | Prisma.ResourceCreateOrConnectWithoutInstitutionInput[];
    createMany?: Prisma.ResourceCreateManyInstitutionInputEnvelope;
    connect?: Prisma.ResourceWhereUniqueInput | Prisma.ResourceWhereUniqueInput[];
};
export type ResourceUpdateManyWithoutInstitutionNestedInput = {
    create?: Prisma.XOR<Prisma.ResourceCreateWithoutInstitutionInput, Prisma.ResourceUncheckedCreateWithoutInstitutionInput> | Prisma.ResourceCreateWithoutInstitutionInput[] | Prisma.ResourceUncheckedCreateWithoutInstitutionInput[];
    connectOrCreate?: Prisma.ResourceCreateOrConnectWithoutInstitutionInput | Prisma.ResourceCreateOrConnectWithoutInstitutionInput[];
    upsert?: Prisma.ResourceUpsertWithWhereUniqueWithoutInstitutionInput | Prisma.ResourceUpsertWithWhereUniqueWithoutInstitutionInput[];
    createMany?: Prisma.ResourceCreateManyInstitutionInputEnvelope;
    set?: Prisma.ResourceWhereUniqueInput | Prisma.ResourceWhereUniqueInput[];
    disconnect?: Prisma.ResourceWhereUniqueInput | Prisma.ResourceWhereUniqueInput[];
    delete?: Prisma.ResourceWhereUniqueInput | Prisma.ResourceWhereUniqueInput[];
    connect?: Prisma.ResourceWhereUniqueInput | Prisma.ResourceWhereUniqueInput[];
    update?: Prisma.ResourceUpdateWithWhereUniqueWithoutInstitutionInput | Prisma.ResourceUpdateWithWhereUniqueWithoutInstitutionInput[];
    updateMany?: Prisma.ResourceUpdateManyWithWhereWithoutInstitutionInput | Prisma.ResourceUpdateManyWithWhereWithoutInstitutionInput[];
    deleteMany?: Prisma.ResourceScalarWhereInput | Prisma.ResourceScalarWhereInput[];
};
export type ResourceUncheckedUpdateManyWithoutInstitutionNestedInput = {
    create?: Prisma.XOR<Prisma.ResourceCreateWithoutInstitutionInput, Prisma.ResourceUncheckedCreateWithoutInstitutionInput> | Prisma.ResourceCreateWithoutInstitutionInput[] | Prisma.ResourceUncheckedCreateWithoutInstitutionInput[];
    connectOrCreate?: Prisma.ResourceCreateOrConnectWithoutInstitutionInput | Prisma.ResourceCreateOrConnectWithoutInstitutionInput[];
    upsert?: Prisma.ResourceUpsertWithWhereUniqueWithoutInstitutionInput | Prisma.ResourceUpsertWithWhereUniqueWithoutInstitutionInput[];
    createMany?: Prisma.ResourceCreateManyInstitutionInputEnvelope;
    set?: Prisma.ResourceWhereUniqueInput | Prisma.ResourceWhereUniqueInput[];
    disconnect?: Prisma.ResourceWhereUniqueInput | Prisma.ResourceWhereUniqueInput[];
    delete?: Prisma.ResourceWhereUniqueInput | Prisma.ResourceWhereUniqueInput[];
    connect?: Prisma.ResourceWhereUniqueInput | Prisma.ResourceWhereUniqueInput[];
    update?: Prisma.ResourceUpdateWithWhereUniqueWithoutInstitutionInput | Prisma.ResourceUpdateWithWhereUniqueWithoutInstitutionInput[];
    updateMany?: Prisma.ResourceUpdateManyWithWhereWithoutInstitutionInput | Prisma.ResourceUpdateManyWithWhereWithoutInstitutionInput[];
    deleteMany?: Prisma.ResourceScalarWhereInput | Prisma.ResourceScalarWhereInput[];
};
export type EnumResourceTypeFieldUpdateOperationsInput = {
    set?: $Enums.ResourceType;
};
export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type ResourceCreateNestedOneWithoutBookingsInput = {
    create?: Prisma.XOR<Prisma.ResourceCreateWithoutBookingsInput, Prisma.ResourceUncheckedCreateWithoutBookingsInput>;
    connectOrCreate?: Prisma.ResourceCreateOrConnectWithoutBookingsInput;
    connect?: Prisma.ResourceWhereUniqueInput;
};
export type ResourceUpdateOneRequiredWithoutBookingsNestedInput = {
    create?: Prisma.XOR<Prisma.ResourceCreateWithoutBookingsInput, Prisma.ResourceUncheckedCreateWithoutBookingsInput>;
    connectOrCreate?: Prisma.ResourceCreateOrConnectWithoutBookingsInput;
    upsert?: Prisma.ResourceUpsertWithoutBookingsInput;
    connect?: Prisma.ResourceWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ResourceUpdateToOneWithWhereWithoutBookingsInput, Prisma.ResourceUpdateWithoutBookingsInput>, Prisma.ResourceUncheckedUpdateWithoutBookingsInput>;
};
export type ResourceCreateWithoutInstitutionInput = {
    id?: string;
    name: string;
    type: $Enums.ResourceType;
    location?: string | null;
    capacity?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    bookings?: Prisma.BookingCreateNestedManyWithoutResourceInput;
};
export type ResourceUncheckedCreateWithoutInstitutionInput = {
    id?: string;
    name: string;
    type: $Enums.ResourceType;
    location?: string | null;
    capacity?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    bookings?: Prisma.BookingUncheckedCreateNestedManyWithoutResourceInput;
};
export type ResourceCreateOrConnectWithoutInstitutionInput = {
    where: Prisma.ResourceWhereUniqueInput;
    create: Prisma.XOR<Prisma.ResourceCreateWithoutInstitutionInput, Prisma.ResourceUncheckedCreateWithoutInstitutionInput>;
};
export type ResourceCreateManyInstitutionInputEnvelope = {
    data: Prisma.ResourceCreateManyInstitutionInput | Prisma.ResourceCreateManyInstitutionInput[];
    skipDuplicates?: boolean;
};
export type ResourceUpsertWithWhereUniqueWithoutInstitutionInput = {
    where: Prisma.ResourceWhereUniqueInput;
    update: Prisma.XOR<Prisma.ResourceUpdateWithoutInstitutionInput, Prisma.ResourceUncheckedUpdateWithoutInstitutionInput>;
    create: Prisma.XOR<Prisma.ResourceCreateWithoutInstitutionInput, Prisma.ResourceUncheckedCreateWithoutInstitutionInput>;
};
export type ResourceUpdateWithWhereUniqueWithoutInstitutionInput = {
    where: Prisma.ResourceWhereUniqueInput;
    data: Prisma.XOR<Prisma.ResourceUpdateWithoutInstitutionInput, Prisma.ResourceUncheckedUpdateWithoutInstitutionInput>;
};
export type ResourceUpdateManyWithWhereWithoutInstitutionInput = {
    where: Prisma.ResourceScalarWhereInput;
    data: Prisma.XOR<Prisma.ResourceUpdateManyMutationInput, Prisma.ResourceUncheckedUpdateManyWithoutInstitutionInput>;
};
export type ResourceScalarWhereInput = {
    AND?: Prisma.ResourceScalarWhereInput | Prisma.ResourceScalarWhereInput[];
    OR?: Prisma.ResourceScalarWhereInput[];
    NOT?: Prisma.ResourceScalarWhereInput | Prisma.ResourceScalarWhereInput[];
    id?: Prisma.StringFilter<"Resource"> | string;
    institutionId?: Prisma.StringFilter<"Resource"> | string;
    name?: Prisma.StringFilter<"Resource"> | string;
    type?: Prisma.EnumResourceTypeFilter<"Resource"> | $Enums.ResourceType;
    location?: Prisma.StringNullableFilter<"Resource"> | string | null;
    capacity?: Prisma.IntNullableFilter<"Resource"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"Resource"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Resource"> | Date | string;
};
export type ResourceCreateWithoutBookingsInput = {
    id?: string;
    name: string;
    type: $Enums.ResourceType;
    location?: string | null;
    capacity?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    institution: Prisma.InstitutionCreateNestedOneWithoutResourcesInput;
};
export type ResourceUncheckedCreateWithoutBookingsInput = {
    id?: string;
    institutionId: string;
    name: string;
    type: $Enums.ResourceType;
    location?: string | null;
    capacity?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ResourceCreateOrConnectWithoutBookingsInput = {
    where: Prisma.ResourceWhereUniqueInput;
    create: Prisma.XOR<Prisma.ResourceCreateWithoutBookingsInput, Prisma.ResourceUncheckedCreateWithoutBookingsInput>;
};
export type ResourceUpsertWithoutBookingsInput = {
    update: Prisma.XOR<Prisma.ResourceUpdateWithoutBookingsInput, Prisma.ResourceUncheckedUpdateWithoutBookingsInput>;
    create: Prisma.XOR<Prisma.ResourceCreateWithoutBookingsInput, Prisma.ResourceUncheckedCreateWithoutBookingsInput>;
    where?: Prisma.ResourceWhereInput;
};
export type ResourceUpdateToOneWithWhereWithoutBookingsInput = {
    where?: Prisma.ResourceWhereInput;
    data: Prisma.XOR<Prisma.ResourceUpdateWithoutBookingsInput, Prisma.ResourceUncheckedUpdateWithoutBookingsInput>;
};
export type ResourceUpdateWithoutBookingsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumResourceTypeFieldUpdateOperationsInput | $Enums.ResourceType;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    capacity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    institution?: Prisma.InstitutionUpdateOneRequiredWithoutResourcesNestedInput;
};
export type ResourceUncheckedUpdateWithoutBookingsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    institutionId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumResourceTypeFieldUpdateOperationsInput | $Enums.ResourceType;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    capacity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ResourceCreateManyInstitutionInput = {
    id?: string;
    name: string;
    type: $Enums.ResourceType;
    location?: string | null;
    capacity?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ResourceUpdateWithoutInstitutionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumResourceTypeFieldUpdateOperationsInput | $Enums.ResourceType;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    capacity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    bookings?: Prisma.BookingUpdateManyWithoutResourceNestedInput;
};
export type ResourceUncheckedUpdateWithoutInstitutionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumResourceTypeFieldUpdateOperationsInput | $Enums.ResourceType;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    capacity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    bookings?: Prisma.BookingUncheckedUpdateManyWithoutResourceNestedInput;
};
export type ResourceUncheckedUpdateManyWithoutInstitutionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumResourceTypeFieldUpdateOperationsInput | $Enums.ResourceType;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    capacity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ResourceCountOutputType = {
    bookings: number;
};
export type ResourceCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    bookings?: boolean | ResourceCountOutputTypeCountBookingsArgs;
};
export type ResourceCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ResourceCountOutputTypeSelect<ExtArgs> | null;
};
export type ResourceCountOutputTypeCountBookingsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BookingWhereInput;
};
export type ResourceSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    institutionId?: boolean;
    name?: boolean;
    type?: boolean;
    location?: boolean;
    capacity?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    institution?: boolean | Prisma.InstitutionDefaultArgs<ExtArgs>;
    bookings?: boolean | Prisma.Resource$bookingsArgs<ExtArgs>;
    _count?: boolean | Prisma.ResourceCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["resource"]>;
export type ResourceSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    institutionId?: boolean;
    name?: boolean;
    type?: boolean;
    location?: boolean;
    capacity?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    institution?: boolean | Prisma.InstitutionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["resource"]>;
export type ResourceSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    institutionId?: boolean;
    name?: boolean;
    type?: boolean;
    location?: boolean;
    capacity?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    institution?: boolean | Prisma.InstitutionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["resource"]>;
export type ResourceSelectScalar = {
    id?: boolean;
    institutionId?: boolean;
    name?: boolean;
    type?: boolean;
    location?: boolean;
    capacity?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ResourceOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "institutionId" | "name" | "type" | "location" | "capacity" | "createdAt" | "updatedAt", ExtArgs["result"]["resource"]>;
export type ResourceInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    institution?: boolean | Prisma.InstitutionDefaultArgs<ExtArgs>;
    bookings?: boolean | Prisma.Resource$bookingsArgs<ExtArgs>;
    _count?: boolean | Prisma.ResourceCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ResourceIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    institution?: boolean | Prisma.InstitutionDefaultArgs<ExtArgs>;
};
export type ResourceIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    institution?: boolean | Prisma.InstitutionDefaultArgs<ExtArgs>;
};
export type $ResourcePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Resource";
    objects: {
        institution: Prisma.$InstitutionPayload<ExtArgs>;
        bookings: Prisma.$BookingPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        institutionId: string;
        name: string;
        type: $Enums.ResourceType;
        location: string | null;
        capacity: number | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["resource"]>;
    composites: {};
};
export type ResourceGetPayload<S extends boolean | null | undefined | ResourceDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ResourcePayload, S>;
export type ResourceCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ResourceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ResourceCountAggregateInputType | true;
};
export interface ResourceDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Resource'];
        meta: {
            name: 'Resource';
        };
    };
    findUnique<T extends ResourceFindUniqueArgs>(args: Prisma.SelectSubset<T, ResourceFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ResourceClient<runtime.Types.Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ResourceFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ResourceFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ResourceClient<runtime.Types.Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ResourceFindFirstArgs>(args?: Prisma.SelectSubset<T, ResourceFindFirstArgs<ExtArgs>>): Prisma.Prisma__ResourceClient<runtime.Types.Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ResourceFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ResourceFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ResourceClient<runtime.Types.Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ResourceFindManyArgs>(args?: Prisma.SelectSubset<T, ResourceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ResourceCreateArgs>(args: Prisma.SelectSubset<T, ResourceCreateArgs<ExtArgs>>): Prisma.Prisma__ResourceClient<runtime.Types.Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ResourceCreateManyArgs>(args?: Prisma.SelectSubset<T, ResourceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ResourceCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ResourceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ResourceDeleteArgs>(args: Prisma.SelectSubset<T, ResourceDeleteArgs<ExtArgs>>): Prisma.Prisma__ResourceClient<runtime.Types.Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ResourceUpdateArgs>(args: Prisma.SelectSubset<T, ResourceUpdateArgs<ExtArgs>>): Prisma.Prisma__ResourceClient<runtime.Types.Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ResourceDeleteManyArgs>(args?: Prisma.SelectSubset<T, ResourceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ResourceUpdateManyArgs>(args: Prisma.SelectSubset<T, ResourceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ResourceUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ResourceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ResourceUpsertArgs>(args: Prisma.SelectSubset<T, ResourceUpsertArgs<ExtArgs>>): Prisma.Prisma__ResourceClient<runtime.Types.Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ResourceCountArgs>(args?: Prisma.Subset<T, ResourceCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ResourceCountAggregateOutputType> : number>;
    aggregate<T extends ResourceAggregateArgs>(args: Prisma.Subset<T, ResourceAggregateArgs>): Prisma.PrismaPromise<GetResourceAggregateType<T>>;
    groupBy<T extends ResourceGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ResourceGroupByArgs['orderBy'];
    } : {
        orderBy?: ResourceGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ResourceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetResourceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ResourceFieldRefs;
}
export interface Prisma__ResourceClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    institution<T extends Prisma.InstitutionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.InstitutionDefaultArgs<ExtArgs>>): Prisma.Prisma__InstitutionClient<runtime.Types.Result.GetResult<Prisma.$InstitutionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    bookings<T extends Prisma.Resource$bookingsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Resource$bookingsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ResourceFieldRefs {
    readonly id: Prisma.FieldRef<"Resource", 'String'>;
    readonly institutionId: Prisma.FieldRef<"Resource", 'String'>;
    readonly name: Prisma.FieldRef<"Resource", 'String'>;
    readonly type: Prisma.FieldRef<"Resource", 'ResourceType'>;
    readonly location: Prisma.FieldRef<"Resource", 'String'>;
    readonly capacity: Prisma.FieldRef<"Resource", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"Resource", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Resource", 'DateTime'>;
}
export type ResourceFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ResourceSelect<ExtArgs> | null;
    omit?: Prisma.ResourceOmit<ExtArgs> | null;
    include?: Prisma.ResourceInclude<ExtArgs> | null;
    where: Prisma.ResourceWhereUniqueInput;
};
export type ResourceFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ResourceSelect<ExtArgs> | null;
    omit?: Prisma.ResourceOmit<ExtArgs> | null;
    include?: Prisma.ResourceInclude<ExtArgs> | null;
    where: Prisma.ResourceWhereUniqueInput;
};
export type ResourceFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ResourceFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ResourceFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ResourceCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ResourceSelect<ExtArgs> | null;
    omit?: Prisma.ResourceOmit<ExtArgs> | null;
    include?: Prisma.ResourceInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ResourceCreateInput, Prisma.ResourceUncheckedCreateInput>;
};
export type ResourceCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ResourceCreateManyInput | Prisma.ResourceCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ResourceCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ResourceSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ResourceOmit<ExtArgs> | null;
    data: Prisma.ResourceCreateManyInput | Prisma.ResourceCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ResourceIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ResourceUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ResourceSelect<ExtArgs> | null;
    omit?: Prisma.ResourceOmit<ExtArgs> | null;
    include?: Prisma.ResourceInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ResourceUpdateInput, Prisma.ResourceUncheckedUpdateInput>;
    where: Prisma.ResourceWhereUniqueInput;
};
export type ResourceUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ResourceUpdateManyMutationInput, Prisma.ResourceUncheckedUpdateManyInput>;
    where?: Prisma.ResourceWhereInput;
    limit?: number;
};
export type ResourceUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ResourceSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ResourceOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ResourceUpdateManyMutationInput, Prisma.ResourceUncheckedUpdateManyInput>;
    where?: Prisma.ResourceWhereInput;
    limit?: number;
    include?: Prisma.ResourceIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ResourceUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ResourceSelect<ExtArgs> | null;
    omit?: Prisma.ResourceOmit<ExtArgs> | null;
    include?: Prisma.ResourceInclude<ExtArgs> | null;
    where: Prisma.ResourceWhereUniqueInput;
    create: Prisma.XOR<Prisma.ResourceCreateInput, Prisma.ResourceUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ResourceUpdateInput, Prisma.ResourceUncheckedUpdateInput>;
};
export type ResourceDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ResourceSelect<ExtArgs> | null;
    omit?: Prisma.ResourceOmit<ExtArgs> | null;
    include?: Prisma.ResourceInclude<ExtArgs> | null;
    where: Prisma.ResourceWhereUniqueInput;
};
export type ResourceDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ResourceWhereInput;
    limit?: number;
};
export type Resource$bookingsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ResourceDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ResourceSelect<ExtArgs> | null;
    omit?: Prisma.ResourceOmit<ExtArgs> | null;
    include?: Prisma.ResourceInclude<ExtArgs> | null;
};
export {};
