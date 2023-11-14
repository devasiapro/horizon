"""create contract file table

Revision ID: 7679f09a4c24
Revises: 39b54f790863
Create Date: 2023-11-10 13:12:12.675591

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '7679f09a4c24'
down_revision: Union[str, None] = '39b54f790863'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'contract_file',
        sa.Column('id', sa.Integer(), primary_key = True),
        sa.Column(
            'customer_id', 
            sa.Integer(), 
            nullable = False
        ),
        sa.ForeignKeyConstraint(
            ['customer_id'], 
            ['customer_module.id'], 
            ondelete = 'cascade'
        ),
        sa.Column('file_url', sa.String(256), nullable = True),
        sa.Column('filename', sa.String(256), nullable = False),
        sa.Column(
            'description', 
            sa.String(256), 
            nullable = True
        )
    )


def downgrade() -> None:
    op.drop_table('contract_file')
